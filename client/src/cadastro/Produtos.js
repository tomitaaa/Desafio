import { useState } from "react";
import axios from "axios";

function Produtos() {
    const [ID, setID] = useState(0);
    const [Nome, setNome] = useState("");
    const [VR_venda, setVR_venda] = useState("");

    const handleCancel = () => {
        setID(0);
        setNome("");
        setVR_venda(0);
        
      };
     
    const addCadastro = () => {
        axios
          .post("http://localhost:3001/createProdutos", {
            ID: ID,
            Nome: Nome,
            VR_venda: VR_venda  
          })
          .then(() => {
            console.log("sucesso");
          });
      };

    return(
    <div>
     <div className="CadastroProdutos">
        <label> ID:</label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />   
    <label> Nome:</label>
        <input
          type="text"
          value={Nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <label> Valor da venda: </label>
        <input
          type="text"
          value={VR_venda}
          onChange={(event) => setVR_venda(event.target.value)}
        />
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>

      </div>

    </div>
    
    )
    
    }
    
    
    export default Produtos;