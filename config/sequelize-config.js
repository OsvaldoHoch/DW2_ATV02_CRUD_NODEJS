import Sequelize from "sequelize";

const connection = new Sequelize({
    //Dados de conexão
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '0000',
    database: 'RarduerDB',
    timezone: '-03:00',
});

export default connection;