import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const [clientes, setClientes] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/clientes").then((res) => setClientes(res.data))
    axios.get("http://localhost:3000/fornecedores").then((res) => setFornecedores(res.data))
    axios.get("http://localhost:3000/produtos").then((res) => setProdutos(res.data))
  }, [])

  const estoqueBaixo = produtos.filter((p) => p.estoque < 5).length

  return (
    <div className={styles.painel}>
      <h2>📊 Visão geral</h2>
      <div className={styles.cards}>
        <Link to="/clientes" className={styles.card}>
          <strong>{clientes.length}</strong> 👥 clientes
        </Link>
        <Link to="/fornecedores" className={styles.card}>
          <strong>{fornecedores.length}</strong> 🚚 fornecedores
        </Link>
        <Link to="/produtos" className={styles.card}>
          <strong>{produtos.length}</strong> 📦 produtos
        </Link>
      </div>
      {estoqueBaixo > 0 && (
        <p className={styles.alerta}>⚠️ {estoqueBaixo} produtos com estoque baixo</p>
      )}
    </div>
  )
}

export default Dashboard
