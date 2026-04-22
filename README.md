Descripción General:

En este proyecto desarrollé una mini Pokédex usando React que consume datos de una API pública. El objetivo fue poner en práctica cómo hacer peticiones, trabajar con datos reales y mostrarlos de forma clara en una interfaz.

Endpoints utilizados:

Usé endpoints para obtener un Pokémon por nombre o ID, traer una lista de Pokémon y consultar por tipo. También probé errores usando datos que no existen.

Funcionalidades:

La aplicación me permite buscar un Pokémon por nombre o ID y mostrar su nombre, imagen, tipos, peso y altura. También agregué una lista de Pokémon con filtro por nombre o tipo. Mientras cargan los datos muestro un loading y, si hay un error, lo manejo sin que se rompa la app.

Estructura:

Organicé el proyecto en un componente principal (App), una carpeta de componentes reutilizables, otra para las llamadas a la API y otra para los estilos. Separé la lógica de la interfaz para mantener orden.

Decisiones:

Usé fetch para hacer las peticiones y async/await para que el código sea más claro. Manejo los errores con try/catch y agregué una validación básica del input para evitar consultas innecesarias.

Dificultades:

Me costó entender bien los datos que devuelve la API, manejar los errores correctamente y organizar el código sin mezclar todo en un solo componente.
