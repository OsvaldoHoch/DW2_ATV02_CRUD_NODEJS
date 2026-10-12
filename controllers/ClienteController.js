import express from "express";
import Cliente from "../models/Cliente.js"
const route = express.Router();

route.get("/clientes", function(req, res) {
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes: clientes,
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao listar os clientes. Erro: ${error}`);
    });
});

route.post("/clientes/cadastrar", (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;

    Cliente.create({
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco,
    }).then(() => {
        res.redirect("/clientes")
    }).catch(error => {
        console.log(`Ocorreu um erro ao cadastrar cliente. Erro: ${error}`);
    });
});

route.get("/clientes/editar/:id", (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id).then(cliente => {
        res.render("clientesEditar", {
            cliente: cliente,
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao editar dados do cliente. Erro: ${error}`);
    });
});

route.post("/clientes/alterar/", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const endereco = req.body.endereco;
    Cliente.update(
    {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco,
    }, {where: {id : id}}
    ).then(() => {
        res.redirect("/clientes");
    }).catch(error => {
        console.log(`Ocorreu um erro ao alterar dados do cliente. Erro: ${error}`);
    });
});

route.get("/clientes/excluir/:id", (req, res) => {
    const id = req.params.id;
    Cliente.destroy({
        where : {id:id},
    }).then(() => {
        res.redirect("/clientes");
    }).catch(error => {
        console.log(`Ocorreu um erro ao excluir clientes. Erro: ${error}`);
    })
})

Cliente.sync({force:false});
export default route;