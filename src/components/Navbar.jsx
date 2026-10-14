import CartWidget from "./CartWidget"

const categorias = ["Filosofía", "Historia", "Religión y espiritualidad", "Divulgación científica", "Autoconocimiento", "Ciencia ficción", "Novela"]

function Navbar (){
    return(
        <nav>
        <h2>Tienda de Libros</h2>
        <ul>
           {categorias.map((categoria) => (
            <li key={categoria}>{categoria}</li>
          ))}
        </ul>
        <CartWidget />
        </nav>
    )
}

export default Navbar