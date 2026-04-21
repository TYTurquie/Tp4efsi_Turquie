Mini Pokédex Web
Descripción

Mini Pokédex hecha con React que consume datos de una API pública. La idea fue aprender cómo funcionan las APIs y cómo mostrar la información en una interfaz.

Endpoints utilizados

Se usaron endpoints para obtener un Pokémon por nombre o ID, traer una lista de Pokémon y también consultar por tipo. Además, se probaron errores usando datos que no existen.

Funcionalidades

La aplicación permite buscar un Pokémon por nombre o ID y mostrar su nombre, imagen, tipos, peso y altura. También tiene una lista de Pokémon con filtro por nombre o tipo. Mientras se cargan los datos se muestra un loading y, si hay un error, se maneja sin que se rompa la app.

Estructura

El proyecto está dividido en un componente principal (App), una carpeta de componentes reutilizables, otra para las llamadas a la API y otra para los estilos. Se separó la lógica de la interfaz para mantener orden.

Decisiones

Se usó fetch para hacer las peticiones y async/await para que el código sea más claro. Los errores se manejan con try/catch y se agregó una validación básica del input para evitar consultas innecesarias.

Dificultades

Costó entender bien la estructura del JSON, manejar los errores correctamente y organizar el código sin mezclar todo en un solo componente."# Tp4efsi_Turquie"  
