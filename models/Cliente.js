// Model Cliente
import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Cliente = connection.define('clientes', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Cliente.sync({force: false});

export default Cliente;