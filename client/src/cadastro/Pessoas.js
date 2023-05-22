import { useState } from "react";
import "../App.css";
import axios from "axios";

function Pessoas() {
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
          .post("http://localhost:3001/createPessoa", {
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
    );

}

export default Pessoas;