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

app.post("/createPessoa", (req, res) => {
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
        [Nome, ID, Cidade, Bairro, CEP, Endereco, Numero, Complemento, Telefone, Email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("valores inseridos");
            }
        }
    );

});

app.post("/createCidades", (req, res) => {
    const ID = req.body.ID;
    const Nome = req.body.Nome;
    const Sigla = req.body.Sigla;

    db.query(
        "INSERT INTO cidade (ID, Nome, Sigla) VALUES (?, ?, ?)",
        [ID, Nome, Sigla], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("valores inseridos");
            }
        }
    );

});

app.post("/createBairros", (req, res) => {
    const ID = req.body.ID;
    const Nome = req.body.Nome;

    db.query(
        "INSERT INTO bairro (ID, Nome) VALUES (?, ?)",
        [ID, Nome], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("valores inseridos");
            }
        }
    );

});


app.post("/createProdutos", (req, res) => {
    const ID = req.body.ID;
    const Nome = req.body.Nome;
    const VR_venda = req.body.VR_venda;
    db.query(
        "INSERT INTO produto (ID, Nome, vr_venda) VALUES (?, ?, ?)",
        [ID, Nome, VR_venda], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("valores inseridos");
            }
        }
    );

});

app.post("/createVendas", (req, res) => {
    const ID = req.body.ID;
    const DT_venda = req.body.DT_venda;
    const Pessoa = req.body.Pessoa;
    db.query(
        "INSERT INTO venda (ID, dt_venda, pessoa) VALUES (?, ?, ?)",
        [ID, DT_venda, Pessoa], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("valores inseridos");
            }
        }
    );
});

app.get("/cidades", (req, res) => {
    db.query("SELECT * FROM cidade", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/bairros", (req, res) => {
    db.query("SELECT * FROM bairro", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/listarPessoas", (req, res) => {
    db.query("SELECT * FROM pessoa", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/pessoasv", (req, res) => {
    db.query("SELECT nome FROM pessoa", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/produtos", (req, res) => {
    db.query("SELECT id, nome FROM produto", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.get("/buscarPessoas/:parteNome", (req, res) => {
    const parteNome = req.params.parteNome;
    const query = "SELECT * FROM pessoa WHERE Nome LIKE ?";
    const searchTerm = `%${parteNome}%`;
    db.query(query, [searchTerm], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao executar a consulta.");
        } else {
            res.send(result);
        }
    });
});

app.get("/buscarPessoasPorCidade/:cidade", (req, res) => {
    const cidade = req.params.cidade;

    db.query(
        "SELECT * FROM pessoa WHERE Cidade LIKE ?",
        `%${cidade}%`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/buscarPessoasPorBairro/:bairro", (req, res) => {
    const bairro = req.params.bairro;

    db.query(
        "SELECT * FROM pessoa WHERE Bairro LIKE ?",
        `%${bairro}%`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});





app.listen(3001, () => {
    console.log("funcionando na porta 3001");
});