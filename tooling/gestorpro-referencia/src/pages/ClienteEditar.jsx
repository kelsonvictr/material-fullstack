import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const ClienteEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cidade, setCidade] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/clientes/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setEmail(res.data.email)
        setTelefone(res.data.telefone)
        setCidade(res.data.cidade)
      })
  }, [id])

  const salvar = () => {
    axios.put("http://localhost:3000/clientes/" + id, {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade
    })
      .then(() => navigate("/clientes"))
  }

  return (
    <div className={styles.pagina}>
      <h2>✏️ Editar cliente</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      <button onClick={salvar}>💾 Salvar alterações</button>
    </div>
  )
}

export default ClienteEditar
