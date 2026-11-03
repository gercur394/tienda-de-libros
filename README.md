# Tienda de Libros

Tienda de Libros es un e-commerce de libros desarrollado con React. Este repositorio contiene el proyecto base, que irá creciendo con nuevas funcionalidades a lo largo del curso.

## Estado del proyecto

En desarrollo. Hasta ahora cuenta con el layout base (barra de navegación con categorías y widget de carrito), el listado de productos cargado de forma asíncrona y la vista de detalle de un producto, con un contador de cantidad que respeta el stock.

Mientras no existan rutas, `App.jsx` muestra de forma temporal el detalle de un único producto, con el `id` escrito directamente en el código. El listado (`ItemListContainer`) sigue disponible en el proyecto y volverá a mostrarse cuando se incorpore la navegación.

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

**Layout**

- **Navbar:** barra de navegación con el nombre de la tienda, las categorías de libros (generadas con `.map()` a partir de un array) y el componente `CartWidget`.
- **CartWidget:** ícono de carrito con un número fijo (hardcodeado) que representa la cantidad de ítems.

**Listado de productos**

- **ItemListContainer:** pide los productos, los guarda en el estado `items` y recibe un mensaje de bienvenida por la prop `greeting`. No recorre la lista.
- **ItemList:** recibe los productos por props y usa `.map()` para renderizar un `Item` por cada uno, usando el `id` como `key`.
- **Item:** card de un producto. Muestra solo la información resumida: imagen, nombre, categoría y precio.

**Detalle de producto**

- **ItemDetailContainer:** recibe por props el `id` del producto, lo busca con `getProductById` dentro de un `useEffect` y guarda el resultado en un estado. Maneja tres situaciones: cargando, error (producto inexistente) y producto listo. No contiene el diseño del detalle.
- **ItemDetail:** componente de presentación. Recibe un producto por props y muestra la información completa en dos sectores: la imagen y un bloque con categoría, nombre, precio, descripción completa y stock disponible. Incluye el contador, o el aviso "Sin stock" si no quedan unidades.
- **ItemCount:** contador reutilizable. Recibe el stock por props (no está escrito dentro del componente), no permite superar el stock ni bajar de cero, y ejecuta la función `onAdd` con la cantidad elegida al presionar "Agregar al carrito".

## Simulación de la carga de datos

Todavía no hay una API real, por lo que los datos se simulan en `src/mock/asyncMock.js`:

1. El archivo contiene un array `products` con los libros de la tienda. Cada producto tiene `id`, `name`, `price`, `category`, `img`, `stock` y `description`. Los datos son de ejemplo, y todas las portadas apuntan, por ahora, a una imagen genérica (`public/img/portada-generica.svg`).
2. **`getProducts`** devuelve una **Promise** que se resuelve a los 2 segundos con el array completo, usando `setTimeout`. Se llama desde `ItemListContainer`, en un `useEffect` con array de dependencias vacío, mediante una función `async` con `await`.
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