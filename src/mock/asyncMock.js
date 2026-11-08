import { slugify } from "../utils/slugify"

const PORTADA_GENERICA = "/img/portada-generica.svg"

// Simula la "base de datos" de la tienda y la demora de una API real.
const products = [
  {
    id: 1,
    name: "Meditaciones",
    price: 15000,
    category: "Filosofía",
    img: PORTADA_GENERICA,
    stock: 12,
    description: "Reflexiones personales de Marco Aurelio sobre la virtud y la disciplina.",
  },
  {
    id: 2,
    name: "Sapiens",
    price: 22000,
    category: "Historia",
    img: PORTADA_GENERICA,
    stock: 8,
    description: "Un recorrido por la historia de la humanidad, desde los cazadores hasta hoy.",
  },
  {
    id: 3,
    name: "El hombre en busca de sentido",
    price: 14000,
    category: "Autoconocimiento",
    img: PORTADA_GENERICA,
    stock: 15,
    description: "Viktor Frankl cuenta su experiencia y cómo encontrar propósito en la adversidad.",
  },
  {
    id: 4,
    name: "Cosmos",
    price: 19000,
    category: "Divulgación científica",
    img: PORTADA_GENERICA,
    stock: 6,
    description: "Carl Sagan invita a un viaje por el universo y por la historia de la ciencia.",
  },
  {
    id: 5,
    name: "Dune",
    price: 24000,
    category: "Ciencia ficción",
    img: PORTADA_GENERICA,
    stock: 10,
    description: "Una saga épica en un planeta desértico, entre política, religión y ecología.",
  },
  {
    id: 6,
    name: "Cien años de soledad",
    price: 18000,
    category: "Novela",
    img: PORTADA_GENERICA,
    stock: 9,
    description: "La historia de la familia Buendía en el mítico pueblo de Macondo.",
  },
  {
    id: 7,
    name: "El poder del ahora",
    price: 16000,
    category: "Religión y espiritualidad",
    img: PORTADA_GENERICA,
    stock: 11,
    description: "Una guía de Eckhart Tolle sobre la atención al momento presente.",
  },
  {
    id: 8,
    name: "El túnel",
    price: 12000,
    category: "Novela",
    img: PORTADA_GENERICA,
    stock: 5,
    description: "Una novela breve de Ernesto Sabato sobre la obsesión de un pintor.",
  },
]

// Ahora getProducts recibe, opcionalmente, el "slug" de una categoría.
// Si llega, devuelve solo los libros de esa categoría; si no, todos.
export const getProducts = (categorySlug) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categorySlug) {
        // filter se queda con los productos que cumplen la condición.
        // Comparamos el slug de la categoría de cada libro con el de la URL.
        resolve(products.filter((p) => slugify(p.category) === categorySlug))
      } else {
        resolve(products)
      }
    }, 1000)
  })
}

// getProductById busca UN producto por su id.
// Recibe el id como parámetro, así que sirve para cualquier libro:
export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === productId)

      if (product) {
        resolve(product) 
      } else {
        reject(new Error("Producto no encontrado")) 
      }
    }, 500) 
  })
}