import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const FornecedorEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/fornecedores/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setCnpj(res.data.cnpj)
        setCategoria(res.data.categoria)
        setTelefone(res.data.telefone)
      })
  }, [id])

  const salvar = () => {
    axios.put("http://localhost:3000/fornecedores/" + id, {
      nome: nome,
      cnpj: cnpj,
      categoria: categoria,
      telefone: telefone
    })
      .then(() => navigate("/fornecedores"))
  }

  return (
    <div className={styles.pagina}>
      <h2>✏️ Editar fornecedor</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button onClick={salvar}>💾 Salvar alterações</button>
    </div>
  )
}

export default FornecedorEditar
