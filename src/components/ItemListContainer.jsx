import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProducts } from "../mock/asyncMock"
import ItemList from "./ItemList"

function ItemListContainer({ greeting }) {
  
  const { id } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true)               // empieza una nueva carga
      const data = await getProducts(id)
      setItems(data)
      setLoading(false)              // terminó la carga
    }

    cargarProductos()
  }, [id]) // se vuelve a ejecutar cada vez que cambia el id de la URL

  let contenido

  if (loading) {
    contenido = <p>Cargando...</p>
  } else if (items.length === 0) {
    // Caso nuevo: la carga terminó pero no hay libros para mostrar
    contenido = <p>No encontramos libros en esta categoría.</p>
  } else {
    contenido = <ItemList items={items} />
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{greeting}</h1>
      {contenido}
    </>
  )
}

export default ItemListContainer