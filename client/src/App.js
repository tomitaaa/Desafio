import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const[Nome, setNome] = useState("");
  const[ID, setID] = useState(0);
  const[Cidade, setCidade] = useState("");
  const[Bairro, setBairro] = useState("");
  const[CEP, setCEP] = useState("");
  const[Endereco, setEndereco] = useState("");
  const[Numero, setNumero] = useState("");
  const[Complemento, setComplemento] = useState("");
  const[Telefone, setTelefone] = useState("");
  const[Email, setEmail] = useState("");

  const [listaCadastro, setlistaCadastro] = useState([]);

  const addCadastro = () => { 
    
    axios.post("http://localhost:3001/create", {
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
   }).then(() => {
    console.log("sucesso");
   });
 
  };

  const getPessoas = () => {
    axios.get("http://localhost:3001/pessoas").then((response) => { 
     setlistaCadastro(response.data); 
  });
    

}


  return (
    <div className="App">
      <div className="Cadastros">
        <label> Nome:</label>
        <input type="text" onChange = {(event) => {setNome(event.target.value); }} />
        <label> ID:</label>
        <input type="number" onChange = {(event) => {setID(event.target.value); }} />
        <label> Cidade:</label>
        <input type="text" onChange = {(event) => {setCidade(event.target.value); }} />
        <label> Bairro:</label>
        <input type="text" onChange = {(event) => {setBairro(event.target.value); }} />
        <label> CEP:</label>
        <input type="text" onChange = {(event) => {setCEP(event.target.value); }} />
        <label> Endereço:</label>
        <input type="text" onChange = {(event) => {setEndereco(event.target.value); }} />
        <label> Número:</label>
        <input type="text" onChange = {(event) => {setNumero(event.target.value); }} />
        <label> Complemento:</label>
        <input type="text" onChange = {(event) => {setComplemento(event.target.value); }} />
        <label> Telefone:</label>
        <input type="text" onChange = {(event) => {setTelefone(event.target.value); }} />
        <label> Email:</label>
        <input type="text" onChange = {(event) => {setEmail(event.target.value); }} />
      
        <button onClick={addCadastro}>Cadastrar</button>

      </div>
      ---------------------------------------------------------------------------------------
      <div className="Pessoas">
      <button onClick={getPessoas}>Listar Pessoas</button>

      {listaCadastro.map((val, key) => {
        return <div className="Pessoa"> 
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
      })}
    
      </div>

    </div>
  );
}

export default App;
