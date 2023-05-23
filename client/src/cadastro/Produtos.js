import { useState } from "react";
import axios from "axios";
import '../css/Produtos.css'
function Produtos() {
  const [ID, setID] = useState(0);
  const [Nome, setNome] = useState("");
  const [VR_venda, setVR_venda] = useState("");
  const [mensagem, setMensagem] = useState("");

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
        setMensagem("Produto cadastrado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o produto:", error);
        setMensagem("Erro ao cadastrar o produto");
      });
  };

  return (
    <div>
      <div className="CadastroProdutos">
        <label> ID do produto: </label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />
        <label> Nome do produto:</label>
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
        {mensagem && <p>{mensagem}</p>}
      </div>

    </div>

  )

}


export default Produtos;