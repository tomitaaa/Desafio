import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import '../css/Vendas.css';


function ProdutoSelector({ onSelect }) {
  const [Produto, setProduto] = useState("");
  const [ValorUnitario, setValorUnitario] = useState(0);

  const handleSelect = () => {
    if (!Produto || ValorUnitario <= 0) {
      console.log("Por favor, selecione um produto válido e informe o valor unitário.");
      return;
    }

    onSelect({ Produto, ValorUnitario });
    setProduto("");
    setValorUnitario(0);
  };

  return (
    <div>
      <label>Produto:</label>
      <input
        type="text"
        value={Produto}
        onChange={(event) => setProduto(event.target.value)}
      />
    </div>
  );
}

function Vendas() {
  const [ID, setID] = useState(0);
  const [DT_venda, setDT_venda] = useState("");
  const [Pessoa, setPessoa] = useState("");
  const [opcoesPessoas, setOpcoesPessoas] = useState([]);
  const [pessoaManual, setPessoaManual] = useState("");
  const [Produto, setProduto] = useState("");
  const [opcoesProdutos, setOpcoesProdutos] = useState([]);
  const [produtoManual, setProdutoManual] = useState("");
  const [Quantidade, setQuantidade] = useState(0);
  const [ValorUnitario, setValorUnitario] = useState(0);
  const [SubTotalEditable, setSubTotalEditable] = useState(0);
  const [vendasGuardadas, setVendasGuardadas] = useState([]);
  const [TotalVenda, setTotalVenda] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/pessoasv").then((response) => {
      const dadosPessoas = response.data.map((pessoa) => ({
        label: pessoa.nome,
        value: pessoa.id,
      }));
      setOpcoesPessoas(dadosPessoas);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/produtos").then((response) => {
      const dadosProdutos = response.data.map((produto) => ({
        label: produto.nome,
        value: produto.id,
      }));
      setOpcoesProdutos(dadosProdutos);
    });
  }, []);

  const handleCancel = () => {
    setID(0);
    setDT_venda("");
    setPessoa("");
    setPessoaManual("");
    setProduto("");
    setProdutoManual("");
    setQuantidade(0);
    setValorUnitario(0);
    setSubTotalEditable(0);
    setTotalVenda(0);
  };

  const addCadastro = (produto) => {
    const pessoaSelecionada = pessoaManual
      ? pessoaManual
      : (Pessoa && Pessoa.value);

    const venda = {
      ID: ID,
      DT_venda: DT_venda,
      Pessoa: pessoaSelecionada,
      Produto: produtoManual || Produto.label,
      Quantidade: Quantidade,
      SubTotal: SubTotalEditable,
    };

    setVendasGuardadas([...vendasGuardadas, venda]);
    setTotalVenda(TotalVenda + SubTotalEditable);

    axios.post("http://localhost:3001/createVendas", venda).then(() => {
      console.log("sucesso");
    });
  };

  const handleQuantidadeChange = (event) => {
    const quantidade = event.target.valueAsNumber;
    setQuantidade(quantidade);
  };

  const handleValorUnitarioChange = (event) => {
    const valorUnitario = event.target.valueAsNumber;
    setValorUnitario(valorUnitario);
  };

  useEffect(() => {
    const novoSubTotal = Quantidade * ValorUnitario;
    setSubTotalEditable(novoSubTotal);
    const novoTotalVenda = vendasGuardadas.reduce(
      (total, venda) => total + venda.SubTotal,
      novoSubTotal
    );
    setTotalVenda(novoTotalVenda);
  }, [Quantidade, ValorUnitario, vendasGuardadas]);

  const handlePessoaChange = (selectedOption) => {
    setPessoa(selectedOption);
    if (selectedOption) {
      setPessoaManual(selectedOption.label);
    }
  };

  const handleProdutoChange = (selectedOption) => {
    setProduto(selectedOption);
    if (selectedOption) {
      setProdutoManual(selectedOption.label);
    }
  };

  return (
    <div>
      <div className="CadastroVendas">
        <label>ID:</label>
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
        <input
          type="text"
          value={pessoaManual}
          onChange={(event) => setPessoaManual(event.target.value)}
        />
        <Select
          options={opcoesPessoas}
          value={Pessoa}
          onChange={handlePessoaChange}
        />
        <label>Produto:</label>
        <input
          type="text"
          value={produtoManual}
          onChange={(event) => setProdutoManual(event.target.value)}
        />
        <Select
          options={opcoesProdutos}
          value={Produto}
          onChange={handleProdutoChange}
        />
        <label>Quantidade:</label>
        <input
          type="number"
          value={Quantidade}
          onChange={handleQuantidadeChange}
        />
        <label>Valor Unitário:</label>
        <input
          type="number"
          value={ValorUnitario}
          onChange={handleValorUnitarioChange}
        />
        <label>Sub-total:</label>
        <input
          type="number"
          value={SubTotalEditable}
          onChange={(event) => setSubTotalEditable(event.target.valueAsNumber)}
        />

        <label>Total da Venda:</label>
        <input type="text" value={TotalVenda} readOnly />
        <div className="Buttons">
          <button onClick={() => addCadastro(Produto)}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Vendas;
