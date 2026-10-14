import Navbar from "./components/Navbar"
import ItemListContainer from "./components/ItemListContainer"

function App() {

  return (
    <>
      <Navbar />
      <main>
         <ItemListContainer greeting="¡Bienvenidos a la tienda de tus libros!" />
      </main>
    </> 
  )
}
export default App
