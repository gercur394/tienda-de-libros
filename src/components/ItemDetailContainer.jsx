import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../mock/asyncMock"
import ItemDetail from "./ItemDetail"

function ItemDetailContainer() {
  // El id viene de la URL: en /item/5, id vale "5"
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarProducto = async () => {
      // Antes de cada pedido, limpiamos lo anterior
      setLoading(true)
      setError(null)

      try {
        // Number(id) convierte el texto "5" en el número 5.
        // La URL siempre entrega texto, pero los ids de tus productos son números.
        const data = await getProductById(Number(id))
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarProducto()
  }, [id]) // se vuelve a ejecutar si cambia el id de la URL

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return <ItemDetail product={product} />
}

export default ItemDetailContainer