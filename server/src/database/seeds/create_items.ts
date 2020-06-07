import Knex from 'knex'; // importa o knex para o arquivo, utlizado com letra maiuscula pq no TS os tipos tem essa nomeclatura

export async function seed(knex: Knex) {
    await knex('items').insert([
        {
            title: 'Lampadas', image: 'lampadas.svg'
        },
        {
            title: 'Pilhas e baterias', image: 'baterias.svg'
        },
        {
            title: 'Papeis e papelao', image: 'papeis-papelao.svg'
        },
        {
            title: 'Residuos eletronicos', image: 'eletronicos.svg'
        },
        {
            title: 'Residuos organicos', image: 'organicos.svg'
        },
        {
            title: 'Oleo de cozinha', image: 'oleo.svg'
        },
    ]);
}