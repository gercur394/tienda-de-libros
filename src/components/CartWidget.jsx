import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function CartWidget() {
  const { totalItems } = useCart()

  return (
    <Link to="/cart" className="cart-link">
      <span>🛒</span> {totalItems > 0 && <span className="contador">{totalItems}</span>}
    </Link>
  )
}

export default CartWidget