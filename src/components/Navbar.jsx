import { Link, NavLink } from "react-router-dom"
import CartWidget from "./CartWidget"
import { slugify } from "../utils/slugify"
import "./Navbar.css"

const categorias = ["Filosofía", "Historia", "Religión y espiritualidad", "Divulgación científica", "Autoconocimiento", "Ciencia ficción", "Novela"]

function Navbar() {
  return (
    <nav className="navcss">
      <h2 className="titulo">
        <Link to="/">Tienda de Libros</Link>
      </h2>
      <ul className="lista">
        {categorias.map((categoria) => (
          <li key={categoria}>
            <NavLink to={`/category/${slugify(categoria)}`}>{categoria}</NavLink>
          </li>
        ))}
      </ul>
      <CartWidget />
    </nav>
  )
}

export default Navbar