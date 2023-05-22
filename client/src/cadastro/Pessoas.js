import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Select from 'react-select';
function Pessoas() {
    const [Nome, setNome] = useState("");
    const [ID, setID] = useState(0);
    const [CEP, setCEP] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Numero, setNumero] = useState("");
    const [Complemento, setComplemento] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Email, setEmail] = useState("");
    const [Cidade, setCidade] = useState(null);
    const [Bairro, setBairro] = useState(null);
   
    const [bairroManual, setBairroManual] = useState("");
    const [cidadeManual, setCidadeManual] = useState(""); 

    const [opcoesBairros, setOpcoesBairros] = useState([]);
    const [opcoesCidades, setOpcoesCidades] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/bairros").then((response) => {
        const dadosBairros = response.data.map((bairro) => ({
          label: bairro.nome,
          value: bairro.id,
        }));
        setOpcoesBairros(dadosBairros);
      });
    
      axios.get("http://localhost:3001/cidades").then((response) => {
        const dadosCidades = response.data.map((cidade) => ({
          label: cidade.nome,
          value: cidade.id,
        }));
        setOpcoesCidades(dadosCidades);
      });
    }, []);






    const handleCancel = () => {
        setNome("");
        setID(0);
        setCidadeManual("");
        setBairroManual("");
        setCEP("");
        setEndereco("");
        setNumero("");
        setComplemento("");
        setTelefone("");
        setEmail("");
      };

      const addCadastro = () => {

        const bairroSelecionado = bairroManual ? bairroManual : (Bairro && Bairro.value);
        const cidadeSelecionada = cidadeManual ? cidadeManual : (Cidade && Cidade.value);
      
        if (!bairroSelecionado || !cidadeSelecionada) {
          console.log("Por favor, selecione um bairro e uma cidade válidos.");
          return;
        }

        axios
          .post("http://localhost:3001/createPessoa", {
            Nome: Nome,
            ID: ID,
            Cidade: cidadeSelecionada,
            Bairro: bairroSelecionado,
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
      

    return (
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
  value={cidadeManual}
  onChange={(event) => setCidadeManual(event.target.value)}
/>
<Select
  options={opcoesCidades}
  value={Cidade}
  onChange={(selectedOption) => setCidade(selectedOption)}
/>

<label> Bairro:</label>
<input
  type="text"
  value={bairroManual}
  onChange={(event) => setBairroManual(event.target.value)}
/>
<Select
  options={opcoesBairros}
  value={Bairro}
  onChange={(selectedOption) => setBairro(selectedOption)}
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
    );

}

export default Pessoas;