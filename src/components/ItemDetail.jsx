import ItemCount from "./ItemCount"
import "./ItemDetail.css"
import { useCart } from "../context/CartContext"

function ItemDetail({ product }) {
  // Abrimos la canilla y sacamos solo la palanca que necesitamos
  const { addItem } = useCart()

  // ItemCount llama a esta función con la cantidad elegida.
  // "product" es el libro completo; addItem le suma el campo "quantity".
  const handleAdd = (quantity) => {
    addItem(product, quantity)
  }

  return (
    <article className="item-detail">
      {/* Sector 1: la imagen principal */}
      <div className="item-detail-image">
        <img src={product.img} alt={product.name} />
      </div>

      {/* Sector 2: toda la información del producto */}
      <div className="item-detail-info">
        <p className="item-detail-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="item-detail-price">
          $ {product.price.toLocaleString("es-AR")}
        </p>
        <p className="item-detail-description">{product.description}</p>
        <p className="item-detail-stock">Stock disponible: {product.stock}</p>

        {/* Si hay stock mostramos el contador; si no, un aviso */}
        {product.stock > 0 ? (
          <ItemCount stock={product.stock} onAdd={handleAdd} />
        ) : (
          <p className="item-detail-nostock">Sin stock</p>
        )}
      </div>
    </article>
  )
}

export default ItemDetail