/**
 * @fileoverview Este arquivo define um servidor Express que rola um dado com um número específico de lados.
 */

// Importando o módulo body-parser para analisar o corpo das requisições HTTP
const bodyParser = require("body-parser");

// Importando o módulo express para criar o servidor
const express = require("express");

// Criando uma instância do servidor Express
const app = express();

// Definindo a porta em que o servidor vai rodar
const PORT = process.env.PORT || 3001;

/**
 * @description Configurando o body-parser para analisar requisições com o tipo de conteúdo 'application/json'
 */
app.use(
    bodyParser.urlencoded({
        extended: true,
        type: "application/json",
    })
);

/**
 * @description Configurando os cabeçalhos de CORS para permitir todas as origens, métodos e tipos de conteúdo
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/**
 * @route GET /dado/:lados
 * @param {Request} req - A requisição Express.
 * @param {Response} res - A resposta Express.
 * @description Esta rota recebe um número de lados como parâmetro na URL, rola um dado com esse número de lados e retorna o resultado.
 */
app.get("/dado/:lados", (req, res) => {
    try {
        // Obtendo o número de lados do dado da URL
        let lados = req.params.lados;

        // Convertendo o número de lados para um número inteiro
        let ladosInt = Number(lados);

        // Verificando se o número de lados é um número válido
        if (Number.isNaN(ladosInt)) {
            // Se não for, envia uma resposta com status 404 e uma mensagem de erro
            res.status(404).send("Não foi enviado um número");
            return;
        }

        // Rolando o dado e obtendo um número aleatório entre 1 e o número de lados
        let rolar = Math.floor(Math.random() * ladosInt) + 1;

        // Criando um objeto com o resultado da rolagem e o número de lados do dado
        let resultado = { resultado: rolar, lados: ladosInt };

        // Logando o resultado no console
        console.log(resultado);

        // Enviando o resultado como resposta
        res.send(resultado);
    } catch (erro) {
        // Logando qualquer erro que ocorra durante a execução da função
        console.log("Ocorreu um erro:", erro);

        // Enviando uma resposta com status 500 e uma mensagem de erro
        res.status(500).send("Ocorreu um erro");
    }
});

/**
 * @description Iniciando o servidor na porta definida
 */
app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT);
});
