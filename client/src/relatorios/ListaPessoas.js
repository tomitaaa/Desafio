import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ListaP.css";

function ListaPessoas() {
  const [listaCadastro, setListaCadastro] = useState([]);
  const [parteNome, setParteNome] = useState("");
  const [isNomeEnabled, setIsNomeEnabled] = useState(false);
  const [cidade, setCidade] = useState("");
  const [isCidadeEnabled, setIsCidadeEnabled] = useState(false);
  const [bairro, setBairro] = useState("");
  const [isBairroEnabled, setIsBairroEnabled] = useState(false);

  const buscarPessoasPorCidade = () => {
    axios
      .get(`http://localhost:3001/buscarPessoasPorCidade/${cidade}`)
      .then((response) => {
        setListaCadastro(response.data);
      });
  };

  const buscarPessoasPorBairro = () => {
    axios
      .get(`http://localhost:3001/buscarPessoasPorBairro/${bairro}`)
      .then((response) => {
        setListaCadastro(response.data);
      });
  };
  const buscarPessoas = () => {
    if (parteNome !== "") {
      axios
        .get(`http://localhost:3001/buscarPessoas/${parteNome}`)
        .then((response) => {
          setListaCadastro(response.data);
        });
    }
  };



  const getPessoas = () => {
    axios.get("http://localhost:3001/listarPessoas").then((response) => {
      setListaCadastro(response.data);
    });
  };


  useEffect(() => {
    if (parteNome !== "") {
      buscarPessoas();
    }
  }, [parteNome]);


  useEffect(() => {
    if (cidade !== "") {
      buscarPessoasPorCidade();
    }
  }, [cidade]);


  useEffect(() => {
    if (bairro !== "") {
      buscarPessoasPorBairro();
    }
  }, [bairro]);




  return (
    <div>
      <div className="Formulario">
        <label>
          <input
            type="checkbox"
            checked={isNomeEnabled}
            onChange={(e) => setIsNomeEnabled(e.target.checked)}
          />
          Habilitar Nome
        </label>
        <input
          type="text"
          placeholder="Parte do nome"
          value={parteNome}
          onChange={(e) => setParteNome(e.target.value)}
          disabled={!isNomeEnabled}
        />
        <label>
          <input
            type="checkbox"
            checked={isCidadeEnabled}
            onChange={(e) => setIsCidadeEnabled(e.target.checked)}
          />
          Habilitar Cidade
        </label>
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          disabled={!isCidadeEnabled}
        />
        <label>
          <input
            type="checkbox"
            checked={isBairroEnabled}
            onChange={(e) => setIsBairroEnabled(e.target.checked)}
          />
          Habilitar Bairro
        </label>
        <input
          type="text"
          placeholder="Bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          disabled={!isBairroEnabled}
        />
      </div>

      <div className="Listagem">
        <div>
          <button onClick={getPessoas}>Listar Pessoas</button>

        </div>
        {listaCadastro.map((val, key) => (
          <div className="Pessoa" key={val.ID}>
            <div>
              <h3 style={{ fontSize: "18px" }}>Nome: {val.Nome}</h3>
              <h3 style={{ fontSize: "18px" }}>ID: {val.ID}</h3>
              <h3 style={{ fontSize: "18px" }}>Cidade: {val.Cidade}</h3>
              <h3 style={{ fontSize: "18px" }}>Bairro: {val.Bairro}</h3>
              <h3 style={{ fontSize: "18px" }}>CEP: {val.CEP}</h3>
              <h3 style={{ fontSize: "18px" }}>Endereço: {val.Endereco}</h3>
              <h3 style={{ fontSize: "18px" }}>Número: {val.Numero}</h3>
              <h3 style={{ fontSize: "18px" }}>Complemento: {val.Complemento}</h3>
              <h3 style={{ fontSize: "18px" }}>Telefone: {val.Telefone}</h3>
              <h3 style={{ fontSize: "18px" }}>E-mail: {val.Email}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPessoas;
