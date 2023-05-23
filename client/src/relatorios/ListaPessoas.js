import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "../css/ListaP.css";

function ListaPessoas() {
  const [listaCadastro, setListaCadastro] = useState([]);
  const [parteNome, setParteNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [parteNomeAtiva, setParteNomeAtiva] = useState(false);
  const [cidadeAtiva, setCidadeAtiva] = useState(false);
  const [bairroAtivo, setBairroAtivo] = useState(false);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [bairrosOptions, setBairrosOptions] = useState([]);

  useEffect(() => {
    getCidades();
    getBairros();
  }, []);

  const getCidades = () => {
    axios.get("http://localhost:3001/cidades").then((response) => {
      const dadosCidades = response.data.map((cidade) => ({
        label: cidade.nome,
        value: cidade.id,
      }));

      setCidadesOptions(dadosCidades);
    });
  };

  const getBairros = () => {
    axios.get("http://localhost:3001/bairros").then((response) => {
      const dadosBairros = response.data.map((bairro) => ({
        label: bairro.nome,
        value: bairro.id,
      }));
      setBairrosOptions(dadosBairros);
    });
  };

  const getPessoas = () => {
    axios.get("http://localhost:3001/listarPessoas").then((response) => {
      const dadosPessoas = response.data.map((pessoa) => ({
        label: pessoa.nome,
        value: pessoa.id,
      }));
      setListaCadastro(dadosPessoas);
    });
  };

  const handleParteNomeChange = (e) => {
    setParteNome(e.target.value);
  };

  const handleCidadeChange = (selectedOption) => {
    setCidade(selectedOption ? selectedOption.value : "");
  };

  const handleBairroChange = (selectedOption) => {
    setBairro(selectedOption ? selectedOption.value : "");
  };

  return (
    <div>
      <div className="Listagem">
        <div className="form-group">
          <label htmlFor="parte-nome">Parte do Nome:</label>
          <input
            type="text"
            id="parte-nome"
            value={parteNome}
            onChange={handleParteNomeChange}
            disabled={!parteNomeAtiva}
          />
          <input
            type="checkbox"
            checked={parteNomeAtiva}
            onChange={(e) => setParteNomeAtiva(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            disabled={!cidadeAtiva}
          />
          <input
            type="checkbox"
            checked={cidadeAtiva}
            onChange={(e) => setCidadeAtiva(e.target.checked)}
          />
          {cidadeAtiva && (
            <Select
              options={cidadesOptions}
              onChange={handleCidadeChange}
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            disabled={!bairroAtivo}
          />
          <input
            type="checkbox"
            checked={bairroAtivo}
            onChange={(e) => setBairroAtivo(e.target.checked)}
          />
          {bairroAtivo && (
            <Select
              options={bairrosOptions}
              onChange={handleBairroChange}
            />
          )}
        </div>

        <button onClick={getPessoas}>Listar Pessoas</button>

        {listaCadastro.map((val, key) => (
          <div className="Listagem" key={val.ID}>
            <h3>Nome: {val.Nome}</h3>
            <h3>ID: {val.ID}</h3>
            <h3>Cidade: {val.Cidade}</h3>
            <h3>Bairro: {val.Bairro}</h3>
            <h3>CEP: {val.CEP}</h3>
            <h3>Endereço: {val.Endereco}</h3>
            <h3>Número: {val.Numero}</h3>
            <h3>Complemento: {val.Complemento}</h3>
            <h3>Telefone: {val.Telefone}</h3>
            <h3>E-mail: {val.Email}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPessoas;
