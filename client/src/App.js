import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState("cadastro");
  const [showCadastro, setShowCadastro] = useState(false);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [Nome, setNome] = useState("");
  const [ID, setID] = useState(0);
  const [Cidade, setCidade] = useState("");
  const [Bairro, setBairro] = useState("");
  const [CEP, setCEP] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [Numero, setNumero] = useState("");
  const [Complemento, setComplemento] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Email, setEmail] = useState("");
  const [listaCadastro, setListaCadastro] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowCadastro(tab === "cadastro");
  };

  const handleCancel = () => {
    setNome("");
    setID(0);
    setCidade("");
    setBairro("");
    setCEP("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setTelefone("");
    setEmail("");
  };

  const addCadastro = () => {
    axios
      .post("http://localhost:3001/create", {
        Nome: Nome,
        ID: ID,
        Cidade: Cidade,
        Bairro: Bairro,
        CEP: CEP,
        Endereco: Endereco,
        Numero: Numero,
        Complemento: Complemento,
        Telefone: Telefone,
        Email: Email,
      })
      .then(() => {
        console.log("sucesso");
      });
  };

  const getPessoas = () => {
    axios.get("http://localhost:3001/pessoas").then((response) => {
      setListaCadastro(response.data);
      const uniqueCidades = Array.from(
        new Set(response.data.map((val) => val.Cidade))
      );
      const uniqueBairros = Array.from(
        new Set(response.data.map((val) => val.Bairro))
      );
      setCidades(uniqueCidades);
      setBairros(uniqueBairros);
    });
  };

  return (
    <div className="App">
      <div className="Tabs">
        <button
          className={activeTab === "cadastro" ? "active" : ""}
          onClick={() => handleTabChange("cadastro")}
        >
          Cadastro
        </button>
        <button
          className={activeTab === "movimento" ? "active" : ""}
          onClick={() => handleTabChange("movimento")}
        >
          Movimento
        </button>
        <button
          className={activeTab === "relatorios" ? "active" : ""}
          onClick={() => handleTabChange("relatorios")}
        >
          Relatórios
        </button>
      </div>

      <div className="Content">
        {showCadastro && (
          <div className="Cadastros">
            <div className="CadastroContent">
              <label> Nome:</label>
              <input
                type="text"
                value={Nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <label> ID:</label>
              <input
                type="number"
                value={ID}
                onChange={(event) => setID(event.target.value)}
              />
              <label> Cidade:</label>
              <input
                type="text"
                value={Cidade}
                onChange={(event) => setCidade(event.target.value)}
              />
              <label> Bairro:</label>
              <input
                type="text"
                value={Bairro}
                onChange={(event) => setBairro(event.target.value)}
              />
              <label> CEP:</label>
              <input
                type="text"
                value={CEP}
                onChange={(event) => setCEP(event.target.value)}
              />
              <label> Endereço:</label>
              <input
                type="text"
                value={Endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
              <label> Número:</label>
              <input
                type="text"
                value={Numero}
                onChange={(event) => setNumero(event.target.value)}
              />
              <label> Complemento:</label>
              <input
                type="text"
                value={Complemento}
                onChange={(event) => setComplemento(event.target.value)}
              />
              <label> Telefone:</label>
              <input
                type="text"
                value={Telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
              <label> Email:</label>
              <input
                type="text"
                value={Email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <div className="Buttons">
                <button onClick={addCadastro}>Cadastrar</button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "movimento" && (
          <div className="Movimento">
            {/* Conteúdo da aba de Movimento */}
          </div>
        )}

        {activeTab === "relatorios" && (
          <div className="Relatorios">
            <button onClick={getPessoas}>Listar Pessoas</button>

            {listaCadastro.map((val, key) => (
              <div className="Pessoa" key={val.ID}>
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
        )}
      </div>
    </div>
  );
}

export default App;
