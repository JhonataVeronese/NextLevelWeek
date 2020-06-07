import Knex from '../database/connection'; // Conexao com o banco
import { Request, Response } from 'express'; // Importa o request e response do express, para ser usado na classe, poise aqui tudo precisa ser tipado


class PointsController {
    async create(request: Request, response: Response) { // Tipa o request e response
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        console.log("Itens para serem salvos:");
        console.log(request.body);

        const trx = await Knex.transaction();// para executar as consultas por transaçoes, qndo existir mais de uma consulta que possuem dependencia entre elas
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsaap: whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        // todo o insert retorna os ids salvos
        const ids = await trx('points').insert(point);
        const point_id = ids[0];

        // Filtra dos itens salvos anteriormente o campo itens_id e retorna um {} com os valores para serem vinculados na proxima tabela
        const pointItems = items.map((items_id: Number) => {
            return {
                items_id,
                point_id: point_id
            };
        })

        // Salva os valores encontrados
        await trx('ponit_items').insert(pointItems);

        
        console.log("salvo com sucesso");
        console.log(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point, // retorna todos os dados desse obj
        })
    }
    //-----------------------------------------------------------------------------------
    async show(request: Request, response: Response) { // Tipa o request e response
        const { id } = request.params;
        const point = await Knex('points').where('id', id).first();


        if (!point) {
            return response.status(400).json({ error: "Nao encontro registros para o id: " + id })
        }

        const items = await Knex('items')
            .join('ponit_items', 'items.id', '=', 'ponit_items.items_id')
            .where('ponit_items.point_id', id);


        return response.json({ point, items });
    }
    //-----------------------------------------------------------------------------------
    async index(request: Request, response: Response) { // Tipa o request e response
        const { city, uf, items } = request.query;
        console.log(city, uf, items);

        const parceItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await Knex('points')
            .join('ponit_items', 'points.id', '=', 'ponit_items.point_id')
            .whereIn('ponit_items.items_id', parceItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct();

        return response.json(points);
    }
}
export default PointsController;