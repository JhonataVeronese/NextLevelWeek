import Knex from 'knex'; // importa o knex para o arquivo, utlizado com letra maiuscula pq no TS os tipos tem essa nomeclatura

export async function up(knex: Knex) { // knex : Knex diz que a variavel knex é do tipo do arquivo Knex
    // Cria a tabela
    return knex.schema.createTable('ponit_items', table => {
        table.increments('id').primary();

        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('items_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex) {
    // Remover tabela
    return knex.schema.dropTable('ponit_items');
}