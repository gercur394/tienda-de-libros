import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Cart.css"

function Cart() {
  // Abrimos la canilla y sacamos todo lo que esta vista necesita.
  // Los hooks siempre van ARRIBA, antes de cualquier return condicional.
  const { cart, removeItem, clear, totalPrice } = useCart()

  // CASO 1: carrito vacío. Hacemos un "return temprano":
  // si se cumple, el componente termina acá y no llega al resto del código.
  if (cart.length === 0) {
    return (
      <section className="cart">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste ningún libro. ¡Hay muchas historias esperándote!</p>
        <Link to="/">Ver el catálogo</Link>
      </section>
    )
  }

  // CASO 2: hay libros en el carrito
  return (
    <section className="cart">
      <h2>Tu carrito</h2>

      <ul className="cart-list">
        {/* Mismo patrón de siempre: .map() con la key sobre el elemento que se devuelve */}
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Precio unitario: $ {item.price.toLocaleString("es-AR")}</p>
              <p>Cantidad: {item.quantity}</p>
              {/* El subtotal se CALCULA al dibujar, no se guarda en ningún lado */}
              <p>Subtotal: $ {(item.price * item.quantity).toLocaleString("es-AR")}</p>
            </div>

            {/* Flecha porque hay que pasarle el id: si escribiéramos
                onClick={removeItem(item.id)} se ejecutaría al dibujar el botón */}
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p className="cart-total">Total: $ {totalPrice.toLocaleString("es-AR")}</p>

      <div className="cart-actions">
        {/* Acá no hace falta flecha: clear no recibe argumentos, se pasa tal cual */}
        <button onClick={clear}>Vaciar carrito</button>
        {/* Placeholder: por ahora no hace nada */}
        <button>Finalizar compra</button>
      </div>
    </section>
  )
}

export default Cart