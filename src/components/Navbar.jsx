import CartWidget from "./CartWidget"
import "./Navbar.css"

const categorias = ["Filosofía", "Historia", "Religión y espiritualidad", "Divulgación científica", "Autoconocimiento", "Ciencia ficción", "Novela"]

function Navbar (){
    return(
        <nav className="navcss">
        <h2 className="titulo">Tienda de Libros</h2>
        <ul className="lista">
           {categorias.map((categoria) => (
            <li key={categoria}>{categoria}</li>
          ))}
        </ul>
        <CartWidget />
        </nav>
    )
}

export default Navbar