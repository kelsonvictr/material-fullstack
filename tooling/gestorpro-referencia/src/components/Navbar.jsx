import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>🗂️ GestorPRO</Link>
      <div className={styles.links}>
        <Link to="/clientes">👥 Clientes</Link>
        <Link to="/fornecedores">🚚 Fornecedores</Link>
        <Link to="/produtos">📦 Produtos</Link>
      </div>
    </nav>
  )
}

export default Navbar
