import express from 'express';
import connection from './config/sequelize-config.js';
const app = express();

// Configurando EJS
app.use(express.urlencoded({extend: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Realizando conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(error => {
    console.log(`Ocorreu um erro ao se conectar ao banco de dados. Erro ${error}`);
});

// Importando controllers
import ClienteController from "./controllers/ClienteController.js";
import ProdutoController from "./controllers/ProdutoController.js"

// Importando models
import Cliente from "./models/Cliente.js";
import Produto from "./models/Produto.js";

const DB_NAME = "RarduerDB";
connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`).then(() => {
    console.log(`O banco de dados ${DB_NAME} está criado.`);
}).catch(error => {
    console.log(`Erro ao criar banco de dados. Erro: ${error}`);
});

// Rota Principal
app.get("/", function(req, res) {
    res.render("index");
});
// Rotas
app.use("/", ClienteController);
app.use("/", ProdutoController);

// Inicia servidor na porta 8080
const port = 8080;
app.listen(port, function(error){
    if(error){
        console.log(`Ocorreu um erro!`);
    } else {
        console.log(`O servidor foi iniciado com sucesso em http://localhost:${port}/`);
    };
});