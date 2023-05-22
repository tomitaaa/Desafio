import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function Vendas() {
  const [ID, setID] = useState(0);
  const [DT_venda, setDT_venda] = useState("");
  const [Pessoa, setPessoa] = useState("");
  const [opcoesPessoas, setOpcoesPessoas] = useState([]);
  const [pessoaManual, setPessoaManual] = useState("");
  const [Produto, setProduto] = useState("");
  const [Quantidade, setQuantidade] = useState(0);
  const [ValorUnitario, setValorUnitario] = useState(0);
  const [SubTotal, setSubTotal] = useState(0);
  const [vendasGuardadas, setVendasGuardadas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pessoasv").then((response) => {
      const dadosPessoas = response.data.map((pessoa) => ({
        label: pessoa.nome,
        value: pessoa.id,
      }));
      setOpcoesPessoas(dadosPessoas);
    });
  }, []);

  const handleCancel = () => {
    setID(0);
    setDT_venda("");
    setPessoa("");
    setPessoaManual("");
    setProduto("");
    setQuantidade(0);
    setValorUnitario(0);
    setSubTotal(0);
  };

  const addCadastro = () => {
    const pessoaSelecionada = pessoaManual ? pessoaManual : (Pessoa && Pessoa.value);

    if (!pessoaSelecionada) {
      console.log("Por favor, selecione uma pessoa válida.");
      return;
    }

    const venda = {
      ID: ID,
      DT_venda: DT_venda,
      Pessoa: pessoaSelecionada,
      Produto: Produto,
      Quantidade: Quantidade,
      ValorUnitario: ValorUnitario,
      SubTotal: SubTotal,
    };

    setVendasGuardadas([...vendasGuardadas, venda]);

    axios.post("http://localhost:3001/createVendas", venda).then(() => {
      console.log("sucesso");
    });
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
          onChange={(selectedOption) => setPessoa(selectedOption)}
        />
        <label>Produto:</label>
        <input
          type="text"
          value={Produto}
          onChange={(event) => setProduto(event.target.value)}
        />
        <label>Quantidade:</label>
        <input
          type="number"
          value={Quantidade}
          onChange={(event) => {
            const quantidade = event.target.valueAsNumber;
            setQuantidade(quantidade);
            setSubTotal(quantidade * ValorUnitario);
          }}
        />
        <label>Valor unitário:</label>
        <input
          type="number"
          value={ValorUnitario}
          onChange={(event) => {
            const valorUnitario = event.target.valueAsNumber;
            setValorUnitario(valorUnitario);
            setSubTotal(Quantidade * valorUnitario);
          }}
        />
        <label>Sub-total:</label>
        <input type="text" value={SubTotal} readOnly />
        <div className="Buttons">
          <button onClick={addCadastro}>Cadastrar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
      <div>
        <h3>Vendas Guardadas:</h3>
        <ul>
          {vendasGuardadas.map((venda, index) => (
            <li key={index}>
              ID: {venda.ID}, Data da venda: {venda.DT_venda}, Pessoa: {venda.Pessoa},
              Produto: {venda.Produto}, Quantidade: {venda.Quantidade}, Valor unitário: {venda.ValorUnitario},
              Sub-total: {venda.SubTotal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Vendas;