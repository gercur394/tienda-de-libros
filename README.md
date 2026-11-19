# Tienda de Libros

Tienda de Libros es un e-commerce de libros desarrollado con React. Este repositorio contiene el proyecto base, que irá creciendo con nuevas funcionalidades a lo largo del curso.

## Estado del proyecto

En desarrollo. Hasta ahora cuenta con el layout base, el listado de productos cargado de forma asíncrona, la vista de detalle con un contador de cantidad, la navegación completa con React Router y un carrito de compras funcional con estado global.

## Tecnologías utilizadas

- React
- React Router (`react-router-dom`)
- Context API (estado global del carrito)
- Vite
- JavaScript
- CSS (Flexbox y Grid)
- ESLint
- Node.js y npm
- Git y GitHub

## Carrito de compras (Context API)

El estado del carrito vive en un contexto global, definido en `src/context/CartContext.jsx`, y es accesible desde cualquier ruta.

- **`CartProvider`:** componente que guarda el estado `cart` (un array) y lo expone, junto con las funciones para modificarlo, mediante `CartContext.Provider`. En `App.jsx` envuelve a toda la aplicación, por encima del router.
- **`useCart`:** custom hook que encapsula `useContext(CartContext)`. Lanza un error claro si se usa fuera de un `CartProvider`.

Cada entrada del carrito es el producto completo más un campo `quantity`. Todas las actualizaciones son **inmutables**: se crean copias del array y de los objetos con `.map()`, `.filter()` y *spread*, nunca se modifica el estado original.

| Elemento | Descripción |
|---|---|
| `cart` | Array con los productos agregados y su cantidad |
| `addItem(item, quantity)` | Agrega un producto. Si ya existe (se compara por `id`), suma la cantidad a la entrada existente sin duplicarla |
| `removeItem(itemId)` | Elimina un producto del carrito por su `id` |
| `clear()` | Vacía el carrito |
| `isInCart(id)` | Devuelve `true` si el producto ya está en el carrito |
| `totalItems` | Cantidad total de unidades (dato calculado con `reduce`) |
| `totalPrice` | Precio total de la compra (dato calculado con `reduce`) |

`totalItems` y `totalPrice` no se guardan en un estado aparte: se calculan a partir de `cart`, por lo que siempre están sincronizados.

**Limitaciones conocidas:** el carrito se guarda en memoria, así que se vacía al recargar la página. Además, el contador de cantidad respeta el stock del producto, pero no descuenta las unidades que ya están en el carrito. La persistencia y el control de stock llegarán con la conexión a una base de datos.

## Navegación (React Router)

La aplicación es una SPA: al navegar no se recarga la página. `App.jsx` define las rutas dentro de un layout compartido.

| Ruta | Qué muestra |
|---|---|
| `/` | Listado con todos los libros |
| `/category/:id` | Listado filtrado por categoría. Ejemplo: `/category/ciencia-ficcion` |
| `/item/:id` | Detalle de un libro. Ejemplo: `/item/5` |
| `/cart` | Vista del carrito |
| `*` | Página 404 para cualquier dirección inexistente |

- **Layout persistente:** el componente `Layout` dibuja la `Navbar` (con el `CartWidget`) y un `<Outlet />`, donde aparece el contenido de cada ruta. Gracias a las rutas anidadas, la barra se ve en todas las páginas.
- **Categorías en la URL:** como las categorías tienen espacios y tildes, se convierten en un *slug* apto para URL (`religion-y-espiritualidad`) con la función `slugify`, en `src/utils/slugify.js`. Se usa para armar los links de la `Navbar` y para comparar la URL con la categoría de cada libro.
- **Links sin recarga:** la navegación interna usa `Link` y `NavLink`. `NavLink` agrega la clase `active` al link de la categoría actual.
- **Parámetros de la URL:** `ItemListContainer` e `ItemDetailContainer` leen el `id` con `useParams` y lo incluyen en el array de dependencias de su `useEffect`. El `id` del detalle llega como texto, por lo que se convierte a número con `Number()`.

## Componentes

Todos los componentes viven en `src/components`, cada uno en su propio archivo y con una única responsabilidad.

**Layout y navegación**

- **Layout:** estructura común a todas las rutas: `Navbar` y un `Outlet` para el contenido.
- **Navbar:** barra de navegación con el nombre de la tienda (link al inicio), las categorías de libros (generadas con `.map()`, cada una con su `NavLink`) y el `CartWidget`.
- **CartWidget:** ícono de carrito que enlaza a `/cart`. Consume el contexto y muestra la cantidad total de unidades; si el carrito está vacío, no muestra el número.
- **NotFound:** página de error 404, con un link para volver al inicio.

**Listado de productos**

- **ItemListContainer:** lee la categoría de la URL, pide los productos y los guarda en el estado `items`. Maneja tres situaciones: cargando, sin resultados y con resultados. No recorre la lista.
- **ItemList:** recibe los productos por props y usa `.map()` para renderizar un `Item` por cada uno, con el `id` como `key`.
- **Item:** card de un producto, que funciona como link a su detalle. Muestra solo la información resumida: imagen, nombre, categoría y precio.

**Detalle de producto**

- **ItemDetailContainer:** lee el `id` de la URL, busca el producto con `getProductById` dentro de un `useEffect` y lo guarda en un estado. Maneja tres situaciones: cargando, error y producto listo.
- **ItemDetail:** componente de presentación. Muestra la información completa del producto e incluye el contador o el aviso "Sin stock". Al presionar "Agregar al carrito", llama a `addItem` del contexto con el producto y la cantidad elegida.
- **ItemCount:** contador reutilizable. Recibe el stock por props, no permite superar el stock ni bajar de cero, y ejecuta la función `onAdd` con la cantidad elegida.

**Carrito**

- **Cart:** vista del carrito. Si está vacío, muestra un mensaje y un link para volver al catálogo. Si tiene productos, lista cada uno con su imagen, nombre, precio unitario, cantidad y subtotal, con un botón para eliminarlo individualmente. Muestra el total de la compra, un botón para vaciar el carrito y un botón "Finalizar compra" que por ahora es solo un placeholder.

## Simulación de la carga de datos

Todavía no hay una API real, por lo que los datos se simulan en `src/mock/asyncMock.js`:

1. El archivo contiene un array `products` con los libros de la tienda. Cada producto tiene `id`, `name`, `price`, `category`, `img`, `stock` y `description`. Los datos son de ejemplo, y todas las portadas apuntan, por ahora, a una imagen genérica (`public/img/portada-generica.svg`).
2. **`getProducts(categorySlug)`** devuelve una **Promise** que se resuelve a los 2 segundos con el array de productos, usando `setTimeout`. Si recibe el slug de una categoría, devuelve solo los productos de esa categoría.
3. **`getProductById(productId)`** devuelve una **Promise** que, tras 500 ms, busca el producto con `find` por su `id`. Si no existe, la rechaza con un error, que `ItemDetailContainer` atrapa con `try/catch`.

Flujo de los datos:

```
getProducts    → ItemListContainer   → ItemList → Item
getProductById → ItemDetailContainer → ItemDetail → ItemCount → addItem (CartContext)
                                        CartContext → CartWidget, Cart
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
│   │   ├── Cart.css
│   │   ├── Cart.jsx
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
│   ├── context/
│   │   └── CartContext.jsx
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