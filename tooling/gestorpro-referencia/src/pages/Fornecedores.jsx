import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Fornecedores.module.css"

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:3000/fornecedores")
      .then((res) => {
        setFornecedores(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este fornecedor?")) {
      axios.delete("http://localhost:3000/fornecedores/" + id)
        .then(() => {
          setFornecedores(fornecedores.filter((f) => f.id !== id))
        })
    }
  }

  if (carregando) { return <p>⏳ Carregando fornecedores...</p> }
  if (erro) { return <p>😵 Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <h2>🚚 Fornecedores</h2>
      <Link to="/fornecedores/novo" className={styles.botaoNovo}>+ Novo fornecedor</Link>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th><th>CNPJ</th><th>Categoria</th><th>Telefone</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((f) => (
            <tr key={f.id}>
              <td>{f.nome}</td>
              <td>{f.cnpj}</td>
              <td>{f.categoria}</td>
              <td>{f.telefone}</td>
              <td>
                <Link to={"/fornecedores/" + f.id + "/editar"}>✏️ Editar</Link>{" "}
                <button onClick={() => excluir(f.id)}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Fornecedores
