import Knex from 'knex'; // importa o knex para o arquivo, utlizado com letra maiuscula pq no TS os tipos tem essa nomeclatura

export async function up(knex: Knex) { // knex : Knex diz que a variavel knex é do tipo do arquivo Knex
    // Cria a tabela
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsaap').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    // Remover tabela
    return knex.schema.dropTable('points');
}