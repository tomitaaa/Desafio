import { useState } from "react";
import axios from "axios";
import '../css/Bairros.css';

function Bairros() {
  const [ID, setID] = useState(0);
  const [Nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCancel = () => {
    setID(0);
    setNome("");
    setMensagem("");
  };

  const addCadastro = () => {
    axios
      .post("http://localhost:3001/createBairros", {
        ID: ID,
        Nome: Nome,
      })
      .then(() => {
        setMensagem("Bairro cadastrado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o bairro:", error);
        setMensagem("Erro ao cadastrar o bairro");
      });
  };

  return (
    <div>
      <div className="CadastroBairro">
        <label>ID do bairro:</label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />
        <label>Nome do bairro:</label>
        <input
          type="text"
          value={Nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default Bairros;
