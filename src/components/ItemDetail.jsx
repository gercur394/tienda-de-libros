import ItemCount from "./ItemCount"
import "./ItemDetail.css"

// Componente de PRESENTACIÓN: recibe un producto por props y lo muestra.
function ItemDetail({ product }) {
  // Esta función se le pasa a ItemCount como "onAdd".
  const handleAdd = (quantity) => {
    console.log(`Agregado: ${quantity} x ${product.name}`)
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