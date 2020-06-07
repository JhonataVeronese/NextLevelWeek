import path from 'path'; //importa o path do node para caminhos

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // __dirname é uma variavel global que acessa em todo o sistema, no caso ele pega do diretorio do arquivo q esta sendo usado
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault : true
};