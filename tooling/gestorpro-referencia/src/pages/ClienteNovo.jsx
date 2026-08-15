import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const ClienteNovo = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cidade, setCidade] = useState("")
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      alert("O nome é obrigatório!")
      return
    }
    axios.post("http://localhost:3000/clientes", {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade
    })
      .then(() => navigate("/clientes"))
  }

  return (
    <div className={styles.pagina}>
      <h2>➕ Novo cliente</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      <button onClick={salvar}>💾 Salvar</button>
    </div>
  )
}

export default ClienteNovo
