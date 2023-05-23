import { useState } from "react";
import axios from "axios";
import '../css/Bairros.css'
function Bairros() {
  const [ID, setID] = useState(0);
  const [Nome, setNome] = useState("");

  const handleCancel = () => {
    setID(0);
    setNome("");

  };

  const addCadastro = () => {
    axios
      .post("http://localhost:3001/createBairros", {
        ID: ID,
        Nome: Nome,
      })
      .then(() => {
        console.log("sucesso");
      });
  };


  return (
    <div>

      <div className="CadastroBairro">
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
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>


      </div>

    </div>

  )

}


export default Bairros;