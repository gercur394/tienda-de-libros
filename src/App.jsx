import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ItemListContainer from "./components/ItemListContainer"
import NotFound from "./components/NotFound"
import ItemDetailContainer from "./components/ItemDetailContainer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<ItemListContainer greeting="¡Bienvenidos a la tienda de tus libros!" />}
          />
          <Route
            path="/category/:id"
            element={<ItemListContainer greeting="¡Bienvenidos a la tienda de tus libros!" />}
          />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App