import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ItemListContainer from "./components/ItemListContainer"
import NotFound from "./components/NotFound"
import ItemDetailContainer from "./components/ItemDetailContainer"
import { CartProvider } from "./context/CartContext"
import Cart from "./components/Cart"

function App() {
  return (
   <CartProvider>
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
          <Route path="/item/:id" element={<ItemDetailContainer />} 
          />
          <Route path="/cart" element={<Cart />}
          />
          <Route path="*" element={<NotFound />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
   </CartProvider> 
  )
}

export default App