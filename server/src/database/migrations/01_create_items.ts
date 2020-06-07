import Knex from 'knex'; // importa o knex para o arquivo, utlizado com letra maiuscula pq no TS os tipos tem essa nomeclatura

export async function up(knex: Knex) { // knex : Knex diz que a variavel knex é do tipo do arquivo Knex
    // Cria a tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex) {
    // Remover tabela
    return knex.schema.dropTable('items');
}