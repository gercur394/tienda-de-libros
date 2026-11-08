import { Link } from "react-router-dom"
import "./Item.css"

function Item({ product }) {
  return (
    <Link to={`/item/${product.id}`} className="item-card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p className="item-price">$ {product.price.toLocaleString("es-AR")}</p>
    </Link>
  )
}

export default Item