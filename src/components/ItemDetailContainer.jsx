import { useState, useEffect } from "react"
import { getProductById } from "../mock/asyncMock"
import ItemDetail from "./ItemDetail"

// Recibe por props el id del producto que hay que mostrar.
function ItemDetailContainer({ productId }) {
  // Tres estados, uno por cada cosa que puede pasar:
  const [product, setProduct] = useState(null)   // el libro (todavía no llegó)
  const [loading, setLoading] = useState(true)   // arranca "cargando"
  const [error, setError] = useState(null)       // sin error al principio

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        // "finally" se ejecuta siempre, salga bien o mal:
        // en ambos casos terminó la espera.
        setLoading(false)
      }
    }

    cargarProducto()
  }, [productId])

  // Según el estado, mostramos una cosa u otra.
  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  // Si llegamos acá, hay un producto: se lo pasamos a ItemDetail por props.
  return <ItemDetail product={product} />
}

export default ItemDetailContainer