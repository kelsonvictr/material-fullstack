import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Clientes.module.css"

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:3000/clientes")
      .then((res) => {
        setClientes(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este cliente?")) {
      axios.delete("http://localhost:3000/clientes/" + id)
        .then(() => {
          setClientes(clientes.filter((c) => c.id !== id))
        })
    }
  }

  if (carregando) { return <p>⏳ Carregando clientes...</p> }
  if (erro) { return <p>😵 Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <h2>👥 Clientes</h2>
      <Link to="/clientes/novo" className={styles.botaoNovo}>+ Novo cliente</Link>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th><th>E-mail</th><th>Telefone</th><th>Cidade</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.cidade}</td>
              <td>
                <Link to={"/clientes/" + c.id + "/editar"}>✏️ Editar</Link>{" "}
                <button onClick={() => excluir(c.id)}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clientes
