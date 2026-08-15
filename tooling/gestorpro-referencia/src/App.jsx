import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Clientes from "./pages/Clientes.jsx"
import ClienteNovo from "./pages/ClienteNovo.jsx"
import ClienteEditar from "./pages/ClienteEditar.jsx"
import Fornecedores from "./pages/Fornecedores.jsx"
import FornecedorNovo from "./pages/FornecedorNovo.jsx"
import FornecedorEditar from "./pages/FornecedorEditar.jsx"
import Produtos from "./pages/Produtos.jsx"
import ProdutoNovo from "./pages/ProdutoNovo.jsx"
import ProdutoEditar from "./pages/ProdutoEditar.jsx"
import NaoEncontrada from "./pages/NaoEncontrada.jsx"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<ClienteNovo />} />
        <Route path="/clientes/:id/editar" element={<ClienteEditar />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/fornecedores/novo" element={<FornecedorNovo />} />
        <Route path="/fornecedores/:id/editar" element={<FornecedorEditar />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/novo" element={<ProdutoNovo />} />
        <Route path="/produtos/:id/editar" element={<ProdutoEditar />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </div>
  )
}

export default App
