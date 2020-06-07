import knex from 'knex';// importa o knex
import path from 'path'; //importa o path do node para caminhos
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // __dirname é uma variavel global que acessa em todo o sistema, no caso ele pega do diretorio do arquivo q esta sendo usado
    },
    useNullAsDefault : true
});

export default connection;