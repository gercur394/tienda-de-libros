# Tienda de Libros

Tienda de Libros es un e-commerce de libros desarrollado con React. Este repositorio contiene el proyecto base, que irá creciendo con nuevas funcionalidades a lo largo del curso.

## Estado del proyecto

En desarrollo. Hasta ahora cuenta con el layout base (barra de navegación con categorías y widget de carrito), el listado de productos cargado de forma asíncrona, la vista de detalle con un contador de cantidad que respeta el stock y la navegación completa entre páginas con React Router.

## Tecnologías utilizadas

- React
- React Router (`react-router-dom`)
- Vite
- JavaScript
- CSS (Flexbox y Grid)
- ESLint
- Node.js y npm
- Git y GitHub

## Navegación (React Router)

La aplicación es una SPA: al navegar no se recarga la página. `App.jsx` envuelve todo en `BrowserRouter` y define las rutas dentro de un layout compartido.

| Ruta | Qué muestra |
|---|---|
| `/` | Listado con todos los libros |
| `/category/:id` | Listado filtrado por categoría. Ejemplo: `/category/ciencia-ficcion` |
| `/item/:id` | Detalle de un libro. Ejemplo: `/item/5` |
| `*` | Página 404 para cualquier dirección inexistente |

- **Layout persistente:** el componente `Layout` dibuja la `Navbar` (con el `CartWidget`) y un `<Outlet />`, donde aparece el contenido de cada ruta. Gracias a las rutas anidadas, la barra se ve en todas las páginas, incluso en la 404.
- **Categorías en la URL:** como las categorías tienen espacios y tildes (por ejemplo, "Religión y espiritualidad"), se convierten en un *slug* apto para URL (`religion-y-espiritualidad`) con la función `slugify`, ubicada en `src/utils/slugify.js`. Se usa tanto para armar los links de la `Navbar` como para comparar la URL con la categoría de cada libro.
- **Links sin recarga:** la navegación interna usa `Link` y `NavLink`. `NavLink` agrega la clase `active` al link de la categoría actual.
- **Parámetros de la URL:** `ItemListContainer` e `ItemDetailContainer` leen el `id` de la URL con `useParams` y lo incluyen en el array de dependencias de su `useEffect`, para volver a cargar los datos cuando la URL cambia. El `id` del detalle llega como texto, por lo que se convierte a número con `Number()` antes de buscar el producto.

## Componentes

Todos los componentes viven en `src/components`, cada uno en su propio archivo y con una única responsabilidad.

**Layout y navegación**

- **Layout:** estructura común a todas las rutas: `Navbar` y un `Outlet` para el contenido.
- **Navbar:** barra de navegación con el nombre de la tienda (link al inicio), las categorías de libros (generadas con `.map()` a partir de un array, cada una con su `NavLink`) y el componente `CartWidget`.
- **CartWidget:** ícono de carrito con un número fijo (hardcodeado) que representa la cantidad de ítems.
- **NotFound:** página de error 404, con un link para volver al inicio.

**Listado de productos**

- **ItemListContainer:** lee la categoría de la URL, pide los productos y los guarda en el estado `items`. Maneja tres situaciones: cargando, sin resultados (categoría sin libros) y con resultados. No recorre la lista.
- **ItemList:** recibe los productos por props y usa `.map()` para renderizar un `Item` por cada uno, usando el `id` como `key`.
- **Item:** card de un producto, que funciona como link a su detalle (`/item/:id`). Muestra solo la información resumida: imagen, nombre, categoría y precio.

**Detalle de producto**

- **ItemDetailContainer:** lee el `id` de la URL, busca el producto con `getProductById` dentro de un `useEffect` y lo guarda en un estado. Maneja tres situaciones: cargando, error (producto inexistente) y producto listo. No contiene el diseño del detalle.
- **ItemDetail:** componente de presentación. Muestra la información completa en dos sectores: la imagen y un bloque con categoría, nombre, precio, descripción y stock disponible. Incluye el contador, o el aviso "Sin stock" si no quedan unidades.
- **ItemCount:** contador reutilizable. Recibe el stock por props, no permite superar el stock ni bajar de cero, y ejecuta la función `onAdd` con la cantidad elegida al presionar "Agregar al carrito".

## Simulación de la carga de datos

Todavía no hay una API real, por lo que los datos se simulan en `src/mock/asyncMock.js`:

1. El archivo contiene un array `products` con los libros de la tienda. Cada producto tiene `id`, `name`, `price`, `category`, `img`, `stock` y `description`. Los datos son de ejemplo, y todas las portadas apuntan, por ahora, a una imagen genérica (`public/img/portada-generica.svg`).
2. **`getProducts(categorySlug)`** devuelve una **Promise** que se resuelve a los 2 segundos con el array de productos, usando `setTimeout`. Si recibe el slug de una categoría, devuelve solo los productos que pertenecen a ella; si no, devuelve todos.
3. **`getProductById(productId)`** recibe un `id` y devuelve una **Promise** que, tras 500 ms, busca el producto con `find` por su propiedad `id`. Si lo encuentra, resuelve la promesa con ese producto. Si no existe, la rechaza con un error ("Producto no encontrado"), que `ItemDetailContainer` atrapa con `try/catch`.
4. En ambos casos, el resultado se guarda con el setter de `useState` y React vuelve a renderizar.

Flujo de los datos:

```
getProducts    → ItemListContainer   → ItemList → Item
getProductById → ItemDetailContainer → ItemDetail → ItemCount
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
│   └── img/
│       └── portada-generica.svg
├── src/
│   ├── components/
│   │   ├── CartWidget.jsx
│   │   ├── Item.css
│   │   ├── Item.jsx
│   │   ├── ItemCount.css
│   │   ├── ItemCount.jsx
│   │   ├── ItemDetail.css
│   │   ├── ItemDetail.jsx
│   │   ├── ItemDetailContainer.jsx
│   │   ├── ItemList.css
│   │   ├── ItemList.jsx
│   │   ├── ItemListContainer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   └── NotFound.jsx
│   ├── mock/
│   │   └── asyncMock.js
│   ├── utils/
│   │   └── slugify.js
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