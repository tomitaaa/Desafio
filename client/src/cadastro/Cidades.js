import { useState } from "react";
import axios from "axios";
import '../css/Cidades.css'
function Cidades() {
  const [ID, setID] = useState(0);
  const [Nome, setNome] = useState("");
  const [Sigla, setSigla] = useState("");
  const [mensagem, setMensagem] = useState("");

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
        setMensagem("Cidade cadastrado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o cidade:", error);
        setMensagem("Erro ao cadastrar o cidade");
      });
  };

  return (
    <div>
      <div className="CadastroCidade">
        <label> ID da Cidade:</label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />
        <label> Nome da Cidade:</label>
        <input
          type="text"
          value={Nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <label> Sigla UF: </label>
        <input
          type="text"
          value={Sigla}
          onChange={(event) => setSigla(event.target.value)}
        />
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
        {mensagem && <p>{mensagem}</p>}

      </div>


    </div>

  )

}


export default Cidades;