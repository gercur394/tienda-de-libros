import { createContext, useContext, useState } from "react"


const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }

  return context
}


export function CartProvider({ children }) {
  
  const [cart, setCart] = useState([])

  
  const addItem = (item, quantity) => {

    setCart((prev) => {
      
      const existe = prev.find((p) => p.id === item.id)

      if (existe) {
        
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + quantity } 
            : p                                    
        )
      }

      return [...prev, { ...item, quantity }]
    })
  }

    // removeItem: filter devuelve un array NUEVO con los productos que cumplen
  // la condición. Con "!==" nos quedamos con todos MENOS el que tiene ese id.
  const removeItem = (itemId) => {
    setCart((prev) => prev.filter((p) => p.id !== itemId))
  }

  // clear: reemplaza el carrito por un array vacío nuevo
  const clear = () => {
    setCart([])
  }

  // isInCart: some devuelve true si AL MENOS UN elemento cumple la condición.
  // Acá usamos "cart" directamente (y no "prev") porque solo estamos LEYENDO,
  // no actualizando el estado.
  const isInCart = (id) => cart.some((p) => p.id === id)

  // DATOS DERIVADOS: se calculan a partir de "cart", no se guardan en un estado.
  // reduce recorre el array acumulando un resultado. Empieza en 0 (segundo argumento).
  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0)
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear, isInCart, totalItems, totalPrice  }}>
      {children}
    </CartContext.Provider>
  )
}