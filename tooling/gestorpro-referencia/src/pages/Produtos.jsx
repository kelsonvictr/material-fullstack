import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Produtos.module.css"

const Produtos = () => {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:3000/produtos")
      .then((res) => {
        setProdutos(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este produto?")) {
      axios.delete("http://localhost:3000/produtos/" + id)
        .then(() => {
          setProdutos(produtos.filter((p) => p.id !== id))
        })
    }
  }

  if (carregando) { return <p>⏳ Carregando produtos...</p> }
  if (erro) { return <p>😵 Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <h2>📦 Produtos</h2>
      <Link to="/produtos/novo" className={styles.botaoNovo}>+ Novo produto</Link>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th><th>Preço</th><th>Estoque</th><th>Categoria</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>
                {p.estoque}
                {p.estoque < 5 && <span className={styles.selo}>⚠️ estoque baixo</span>}
              </td>
              <td>{p.categoria}</td>
              <td>
                <Link to={"/produtos/" + p.id + "/editar"}>✏️ Editar</Link>{" "}
                <button onClick={() => excluir(p.id)}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Produtos
