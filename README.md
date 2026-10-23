# Tienda de Libros

Tienda de Libros es un e-commerce de libros desarrollado con React. Este repositorio contiene el proyecto base, que irá creciendo con nuevas funcionalidades a lo largo del curso.

## Estado del proyecto

En desarrollo. Hasta ahora cuenta con el layout base (barra de navegación con categorías y widget de carrito) y con el listado de productos, que se carga de forma asíncrona a partir de datos simulados.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS (Flexbox y Grid)
- ESLint
- Node.js y npm
- Git y GitHub

## Componentes

Todos los componentes viven en `src/components`, cada uno en su propio archivo y con una única responsabilidad.

- **Navbar:** barra de navegación. Muestra el nombre de la tienda, las categorías de libros (Filosofía, Historia, Religión y espiritualidad, Divulgación científica, Autoconocimiento, Ciencia ficción y Novela) generadas con `.map()` a partir de un array, y el componente `CartWidget`. Sus estilos están en `Navbar.css`.
- **CartWidget:** ícono de carrito con un número que representa la cantidad de ítems. Por ahora el número es fijo (hardcodeado).
- **ItemListContainer:** contenedor de la sección principal. Recibe un mensaje de bienvenida mediante la prop `greeting`, pide los productos y los guarda en el estado `items`. No recorre la lista: esa tarea le corresponde a `ItemList`.
- **ItemList:** recibe el array de productos por props y usa `.map()` para renderizar un componente `Item` por cada producto, usando el `id` del producto como `key`. Sus estilos (grilla responsive) están en `ItemList.css`.
- **Item:** recibe un producto por props y muestra su card: imagen, nombre, descripción y precio. Se encarga únicamente de la presentación visual. Sus estilos están en `Item.css`.

`App.jsx` ensambla la `Navbar` y el `ItemListContainer`, y le pasa el mensaje de bienvenida a este último.

## Simulación de la carga de datos

Todavía no hay una API real, por lo que la carga de productos se simula en el archivo `src/mock/asyncMock.js`:

1. El archivo contiene un array `products` con los libros de la tienda. Cada producto tiene `id`, `name`, `price`, `category`, `img`, `stock` y `description`. Los datos son de ejemplo.
2. La función `getProducts` devuelve una **Promise** que usa `setTimeout` para resolverse a los **2 segundos** con ese array. Así se imita la demora de una petición a un servidor.
3. En `ItemListContainer`, un `useEffect` con el array de dependencias vacío (`[]`) llama a `getProducts` **una sola vez, al montarse el componente**, mediante una función `async` con `await`.
4. Cuando la promesa se cumple, los productos se guardan en el estado `items` (inicializado como array vacío) con el setter de `useState`, y React vuelve a renderizar el listado.

Flujo de los datos:

```
getProducts → ItemListContainer → ItemList → Item
 (la promesa)   (pide y guarda)    (.map)     (card)
```

Cuando el proyecto se conecte a una base de datos real, solo cambiará el origen de los datos.

## Requisitos previos

- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado

## Instalación y ejecución

1. Clonar el repositorio:

```
git clone https://github.com/gercur394/tienda-de-libros.git
```

2. Entrar en la carpeta del proyecto:

```
cd tienda-de-libros
```

3. Instalar las dependencias:

```
npm install
```

4. Iniciar el servidor de desarrollo:

```
npm run dev
```

5. Abrir en el navegador la dirección que indica la terminal (normalmente `http://localhost:5173/`).

## Estructura del proyecto

```
tienda-de-libros/
├── public/
├── src/
│   ├── components/
│   │   ├── CartWidget.jsx
│   │   ├── Item.css
│   │   ├── Item.jsx
│   │   ├── ItemList.css
│   │   ├── ItemList.jsx
│   │   ├── ItemListContainer.jsx
│   │   ├── Navbar.css
│   │   └── Navbar.jsx
│   ├── mock/
│   │   └── asyncMock.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```