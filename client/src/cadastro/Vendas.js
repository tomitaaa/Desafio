import { useState } from "react";
import axios from "axios";

function Vendas() {
    const [ID, setID] = useState(0);
    const [DT_venda, setDT_venda] = useState("");
    const [Pessoa, setPessoa] = useState("");

    const handleCancel = () => {
        setID(0);
        setDT_venda("");
        setPessoa("");
        
      };
     
    const addCadastro = () => {
        axios
          .post("http://localhost:3001/createVendas", {
            ID: ID,
            DT_venda: DT_venda,
            Pessoa: Pessoa 
          })
          .then(() => {
            console.log("sucesso");
          });
      };

    return(
    <div>
     <div className="CadastroVendas">
        <label> ID:</label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />   
    <label> Data da venda:</label>
        <input
          type="text"
          value={DT_venda}
          onChange={(event) => setDT_venda(event.target.value)}
        />
        <label> Pessoa: </label>
        <input
          type="text"
          value={Pessoa}
          onChange={(event) => setPessoa(event.target.value)}
        />
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>

      </div>

    </div>
    
    )
    
    }
    
    
    export default Vendas;