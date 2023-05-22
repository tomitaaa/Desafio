import { useState } from "react";
import axios from "axios";

function Cidades() {
    const [ID, setID] = useState(0);
    const [Nome, setNome] = useState("");
    const [Sigla, setSigla] = useState("");


    const handleCancel = () => {
        setID(0);
        setNome("");
        setSigla("");
        
      };

      const addCadastro = () => {
        axios
          .post("http://localhost:3001/createCidades", {
            ID: ID,
            Nome: Nome,
            Sigla: Sigla  
          })
          .then(() => {
            console.log("sucesso");
          });
      };

    return(
    <div>
        <div className="CadastroCidade">
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
        <label> Sigla: </label>
        <input
          type="text"
          value={Sigla}
          onChange={(event) => setSigla(event.target.value)}
        />
    <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
    
    
     </div>
        
   
    </div>
    
    )
    
    } 
    
    
    export default Cidades;