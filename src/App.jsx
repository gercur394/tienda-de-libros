import Navbar from "./components/Navbar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"


function App() {

  return (
    <>
      <Navbar />
      <main>
         <ItemDetailContainer productId={5} />
      </main>
    </> 
  )
}
export default App
