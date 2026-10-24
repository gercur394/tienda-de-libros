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

// getProducts simula pedirle los productos a un servidor.
// Devuelve una PROMISE: una "promesa" de que el dato va a llegar más tarde.
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000)
  })
}