import { useState } from "react"
import "./ItemCount.css"

// Recibe por props:
//  - stock: el máximo de unidades disponibles (viene del producto)
//  - onAdd: una función a ejecutar cuando se presiona "Agregar al carrito"
function ItemCount({ stock, onAdd }) {
  // La cantidad elegida arranca en 0
  const [count, setCount] = useState(0)

  const increase = () => {
    // Solo sube si todavía no se llegó al stock
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const decrease = () => {
    // Solo baja si todavía no se llegó a cero
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button onClick={decrease} disabled={count === 0}>-</button>
        <span>{count}</span>
        <button onClick={increase} disabled={count === stock}>+</button>
      </div>

      <button onClick={() => onAdd(count)} disabled={count === 0}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount