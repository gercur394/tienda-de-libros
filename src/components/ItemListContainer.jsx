import { useState, useEffect } from "react"
import { getProducts } from "../mock/asyncMock"
import ItemList from "./ItemList"

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await getProducts()
      setItems(data)
    }

    cargarProductos()
  }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{greeting}</h1>
      <ItemList items={items} />
    </>
  )
}

export default ItemListContainer