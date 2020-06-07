import Knex from '../database/connection'; // Conexao com o banco
import { Request, Response } from 'express'; //

class ItemsController {

    async index(request: Request, response: Response) {
        const items = await Knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: item.image,
                // image_url: 'http://localhost:3333/upload/' + item.image
                image_url: `http://192.168.0.5:3333/upload/${item.image}`
            };
        })

        return response.json(serializedItems)
    }
}
export default ItemsController;
