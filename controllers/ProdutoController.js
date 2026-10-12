import express from "express";
import Produto from "../models/Produto.js";
const route = express();

route.get("/produtos", (req, res) => {
    Produto.findAll().then(produtos => {
        res.render("produtos", {
            produtos: produtos,
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao renderizar tabela produtos. Erro: ${error}`);
    });
});

route.post("/produtos/cadastrar", (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const categoria = req.body.categoria;

    Produto.create({
        nome: nome,
        preco: preco,
        categoria: categoria,
    }).then(() => {
        res.redirect("/produtos")
    }).catch(error => {
        console.log(`Ocorreu um erro ao cadastrar produto. Erro: ${error}`);
    });
});

route.get("/produtos/editar/:id", (req, res) => {
    const id = req.params.id;
    Produto.findByPk(id).then(produto => {
        res.render("produtosEditar", {
            produto: produto,
        });
    }).catch(error => {
        console.log(`Ocorreu um erro ao editar dados do produto. Erro: ${error}`);
    });
});

route.post("/produtos/alterar/", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const categoria = req.body.categoria;

    Produto.update(
    {
        nome: nome,
        preco: preco,
        categoria: categoria,
    }, {where: {id : id}}
    ).then(() => {
        res.redirect("/produtos");
    }).catch(error => {
        console.log(`Ocorreu um erro ao alterar dados do produto. Erro: ${error}`);
    });
});

route.get("/produtos/excluir/:id", (req, res) => {
    const id = req.params.id;
    Produto.destroy({
        where : {id:id},
    }).then(() => {
        res.redirect("/produtos");
    }).catch(error => {
        console.log(`Ocorreu um erro ao excluir produtos. Erro: ${error}`);
    })
})

Produto.sync({force:false});
export default route;