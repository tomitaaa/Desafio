import { useState } from "react";
import axios from "axios";

function ListaPessoas() {
    const [listaCadastro, setListaCadastro] = useState([]);

    const getPessoas = () => {
        axios.get("http://localhost:3001/listarPessoas").then((response) => {
          setListaCadastro(response.data);  
        });
      };

return (
<div>

<div className="Listagem">
    <button onClick={getPessoas}>Listar Pessoas</button>

         {listaCadastro.map((val, key) => (
              <div className="Listagem" key={val.ID}>
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

</div>
)


}

export default ListaPessoas;