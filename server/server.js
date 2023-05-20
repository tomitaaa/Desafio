const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "locahost",
    password: "root",
    database: "cadastro_pessoa",
});

app.post("/create", (req, res) => { 
    const Nome = req.body.Nome;
    const ID = req.body.ID;
    const Cidade = req.body.Cidade;
    const Bairro = req.body.Bairro;
    const CEP = req.body.CEP;
    const Endereco = req.body.Endereco;
    const Numero = req.body.Numero;
    const Complemento = req.body.Complemento;
    const Telefone = req.body.Telefone;
    const Email = req.body.Email;


    db.query(
        "INSERT INTO cadastro_pessoa (Nome, ID, Cidade, Bairro, CEP, Endereco, Numero, Complemento, Telefone, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [Nome, ID, Cidade, Bairro, CEP, Endereco, Numero, Complemento, Telefone, Email], (err, result) =>{
            if (err){
                console.log(err);
            } else {
            res.send("valores inseridos");
         }    
        }
    );

});


app.listen(3001, () => {
    console.log("funcionando na porta 3001");
});