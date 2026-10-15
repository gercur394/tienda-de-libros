# Tienda de Libros

Tienda de Libros es un e-commerce de libros desarrollado con React. Este repositorio contiene el proyecto base, que irá creciendo con nuevas funcionalidades a lo largo del curso.

## Estado del proyecto

En desarrollo. Hasta ahora cuenta con la estructura inicial y el layout base: una barra de navegación con categorías y un widget de carrito, y un contenedor principal que recibe un mensaje de bienvenida por props.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS (Flexbox)
- ESLint
- Node.js y npm
- Git y GitHub

## Componentes

Todos los componentes viven en `src/components`, cada uno en su propio archivo.

- **Navbar:** barra de navegación. Muestra el nombre de la tienda, las categorías de libros (Filosofía, Historia, Religión y espiritualidad, Divulgación científica, Autoconocimiento, Ciencia ficción y Novela) generadas con `.map()` a partir de un array, y el componente `CartWidget`. Sus estilos están en `Navbar.css` y usan Flexbox.
- **CartWidget:** ícono de carrito con un número que representa la cantidad de ítems. Por ahora el número es fijo (hardcodeado).
- **ItemListContainer:** contenedor de la sección principal. Recibe un mensaje de bienvenida mediante la prop `greeting` y lo muestra centrado. En próximas entregas mostrará la lista de productos.

`App.jsx` ensambla estos componentes y le pasa el mensaje de bienvenida a `ItemListContainer`.

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
│   └── .gitkeep
├── src/
│   ├── components/
│   │   ├── CartWidget.jsx
│   │   ├── ItemListContainer.jsx
│   │   ├── Navbar.css
│   │   └── Navbar.jsx
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