import { Link } from "react-router-dom"

const NaoEncontrada = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🕳️ Opa! Essa página não existe...</h2>
      <p>Mas o painel está logo ali:</p>
      <Link to="/">← voltar pro início</Link>
    </div>
  )
}

export default NaoEncontrada
