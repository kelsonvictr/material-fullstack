import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const FornecedorNovo = () => {
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      alert("O nome é obrigatório!")
      return
    }
    axios.post("http://localhost:3000/fornecedores", {
      nome: nome,
      cnpj: cnpj,
      categoria: categoria,
      telefone: telefone
    })
      .then(() => navigate("/fornecedores"))
  }

  return (
    <div className={styles.pagina}>
      <h2>➕ Novo fornecedor</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button onClick={salvar}>💾 Salvar</button>
    </div>
  )
}

export default FornecedorNovo
