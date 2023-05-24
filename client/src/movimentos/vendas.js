import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "../css/Vendas.css";

function Vendas() {
  const [ID, setID] = useState(0);
  const [DT_venda, setDT_venda] = useState("");
  const [Pessoa, setPessoa] = useState("");
  const [opcoesPessoas, setOpcoesPessoas] = useState([]);

  const [Produto, setProduto] = useState("");
  const [opcoesProdutos, setOpcoesProdutos] = useState([]);
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [subTotal, setSubTotal] = useState("");

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/pessoasv").then((response) => {
      var pessoasListaSelect = []

      response.data.forEach((pessoa) => {
        var objetoSelect = {
          label: pessoa.ID + " - " + pessoa.nome,
          value: pessoa.ID
        }
        pessoasListaSelect.push(objetoSelect)
      })

      setOpcoesPessoas(pessoasListaSelect);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/produtos").then((response) => {
      var produtosListaSelect = []

      response.data.forEach((produto) => {
        var objetoSelect = {
          label: produto.id + " - " + produto.nome,
          value: produto.id,
          valor: produto.vr_venda
        }
        produtosListaSelect.push(objetoSelect)
      })

      setOpcoesProdutos(produtosListaSelect);
    });
  }, []);


  const handleCancel = () => {
    setID(0);
    setDT_venda("");
    setPessoa("");
  };

  const addCadastro = () => {
    const venda = {
      ID: ID,
      DT_venda: DT_venda,
      Pessoa: Pessoa,
      venda_item: [
        {
          produto: Produto,
          quantidade: quantidade,
          valor_venda: subTotal
        }
      ]
    };

    axios
      .post("http://localhost:3001/createVendas", venda)
      .then(() => {
        setMensagem("Venda registrada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar a venda:", error);
        setMensagem("Erro ao cadastrar a venda");
      });
  };

  const handlePessoaChange = (selectedOption) => {
    setPessoa(selectedOption);
  };

  const handleProdutoChange = (selectedOption) => {
    setProduto(selectedOption);
    setValorUnitario(selectedOption.valor)
    setQuantidade("")
    setSubTotal("")
  };

  const handleQuantidadeChange = (input) => {
    var quantidade = input.target.valueAsNumber;
    setQuantidade(quantidade);
    setSubTotal(quantidade * valorUnitario)
  }

  const handleValorUnitarioChange = (input) => {
    var valorUnitario = input.target.valueAsNumber;
    setValorUnitario(valorUnitario)
    setSubTotal(quantidade * valorUnitario)
  };

  return (
    <div>
      <div className="CadastroVendas">
        <label>ID da venda:</label>
        <input
          type="number"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />
        <label>Data da venda:</label>
        <input
          type="text"
          value={DT_venda}
          onChange={(event) => setDT_venda(event.target.value)}
        />
        <label>Pessoa:</label>
        <Select
          options={opcoesPessoas}
          value={Pessoa}
          onChange={handlePessoaChange}
        />

        <div className="itens">

          <label>Produto:</label>
          <Select
            options={opcoesProdutos}
            value={Produto}
            onChange={handleProdutoChange}
          />

          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={input => handleQuantidadeChange(input)}
          />
          <label>Valor Unitário:</label>
          <input
            type="number"
            value={valorUnitario}
            onChange={input => handleValorUnitarioChange(input)}
          />
          <label>Sub-total:</label>
          <input
            type="number"
            value={subTotal}
            disabled={true}
            onChange={input => setSubTotal(input.target.valueAsNumber)}
          />

        </div>

        <div className="Buttons">
          <button onClick={() => addCadastro()}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default Vendas;
