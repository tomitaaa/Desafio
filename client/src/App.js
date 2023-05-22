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
import ListaPessoas from "./relatorios/ListaPessoas";
import ListaVendas from "./relatorios/ListaVendas";


function App() {

  const [activeTab, setActiveTab] = useState("cadastro");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
      <Dropdown.Item onClick={() => handleTabChange("relatorios.listaPessoas")}>Lista de Pessoas</Dropdown.Item>
      <Dropdown.Item onClick={() => handleTabChange("relatorios.vendas")}>Lista de Vendas</Dropdown.Item>
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
        

        {activeTab === "relatorios.listaPessoas" && (
          <ListaPessoas/>

        )}
        {activeTab === "relatorios.listaVendas" && (
          <ListaVendas/>

        )}
      </div>
    </div>
  );
}

export default App;
