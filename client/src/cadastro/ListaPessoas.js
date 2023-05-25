import { useEffect, useState } from "react";
import axios from "axios";

function ListaPessoas() {
    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/listarPessoas").then((response) => {
            setPessoas(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Lista de Pessoas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cidade</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((pessoa) => (
                        <tr key={pessoa.ID}>
                            <td>{pessoa.ID}</td>
                            <td>{pessoa.Nome}</td>
                            <td>{pessoa.Cidade}</td>
                            <td>{pessoa.Telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaPessoas;
