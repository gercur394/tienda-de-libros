import "./Item.css"

function Item({ product }) {
  return (
    <article className="item-card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="item-price">$ {product.price.toLocaleString("es-AR")}</p>
    </article>
  )
}

export default Item