import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const ProdutoEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [estoque, setEstoque] = useState("")
  const [categoria, setCategoria] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/produtos/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setPreco(res.data.preco)
        setEstoque(res.data.estoque)
        setCategoria(res.data.categoria)
      })
  }, [id])

  const salvar = () => {
    axios.put("http://localhost:3000/produtos/" + id, {
      nome: nome,
      preco: Number(preco),
      estoque: Number(estoque),
      categoria: categoria
    })
      .then(() => navigate("/produtos"))
  }

  return (
    <div className={styles.pagina}>
      <h2>✏️ Editar produto</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
      <input placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
      <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <button onClick={salvar}>💾 Salvar alterações</button>
    </div>
  )
}

export default ProdutoEditar
