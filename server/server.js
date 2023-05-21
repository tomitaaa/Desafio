const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "cadastros",
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
        "INSERT INTO pessoa (Nome, ID, Cidade, Bairro, CEP, Endereco, Numero, Complemento, Telefone, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [Nome, ID, Cidade, Bairro, CEP, Endereco, Numero, Complemento, Telefone, Email], (err, result) =>{
            if (err){
                console.log(err);
            } else {
            res.send("valores inseridos");
         }    
        }
    );

});

app.get("/pessoas", (req, res) => {
db.query("SELECT * FROM pessoa", (err, result) => {
    if (err) {
    console.log(err);
    } else {
        res.send(result);
    }    
  });
});

app.listen(3001, () => {
    console.log("funcionando na porta 3001");
});