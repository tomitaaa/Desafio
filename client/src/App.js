import { useState } from "react";
import "./App.css";
import axios from "axios";
import Pessoas from "./cadastro/Pessoas";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bairros from "./cadastro/Bairros";
import Cidades from "./cadastro/Cidades";
import Produtos from "./cadastro/Produtos";
import Vendas from "./movimentos/vendas";
function App() {

  const [activeTab, setActiveTab] = useState("cadastro");
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]); 
  const [listaCadastro, setListaCadastro] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getPessoas = () => {
    axios.get("http://localhost:3001/pessoas").then((response) => {
      setListaCadastro(response.data);  
    });
  };

  return (
    <div className="App">
      <div className="Tabs">
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="Cadastros">
        Cadastros
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleTabChange("cadastro.bairros")}>Bairros</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTabChange("cadastro.cidades")}>Cidades</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTabChange("cadastro.pessoas")}>Pessoas</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTabChange("cadastro.produtos")}>Produtos</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
        
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="Movimentos">
        Movimentos
       </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleTabChange("movimentos.vendas")}>Vendas</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
      <Dropdown.Toggle variant="secondary" id="Relatórios">
        Relatórios
       </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleTabChange("")}></Dropdown.Item>

        </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="Content">
        {
          activeTab === "cadastro.bairros" && (
            <Bairros/>
          )
        }

        {
          activeTab === "cadastro.pessoas" && (
            <Pessoas/>
          )
        }

        {
          activeTab === "cadastro.cidades" && (
            <Cidades/>
          )
        }

        {
          activeTab === "cadastro.produtos" && (
            <Produtos/>
          )
        }

        {
          activeTab === "movimentos.vendas" && (
            <Vendas/>
          )
        }
        

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
