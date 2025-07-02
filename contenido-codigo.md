# "Single Page Application" (SPA) o Aplicación de Página Única
# "Separación de Responsabilidades"
# "Experiencia de Usuario (UI/UX) Moderna y Centrada en el Cliente"

# ----------- Contenido principal generado -----------

*Uso de Modales*: En lugar de dirigir al usuario a nuevas páginas para iniciar sesión, registrarse o reservar, utilizas ventanas modales (Login, Registro, Reserva). Esto mantiene al usuario en el contexto actual, creando una experiencia fluida y sin interrupciones.


# ----------- Librerias - Frameworks usados -----------
1. **Bootstrap (Version 5.3.7)**: Agregado en el INDEX.HTML.
        Construir interfaces de usuario atractivas y funcionales que se vean bien en cualquier dispositivo.

2. **Chart.js (Librería)**:  Librería de JavaScript que facilita la creación de gráficos atractivos y responsivos utilizando el elemento <canvas> de HTML5.
        Creas múltiples gráficos (barras, dona) para presentar la información de manera clara y visual. La leyenda personalizada para los gráficos de dona es un gran toque.

3. **Flatpickr (Librería)**: Es una herramienta de JavaScript ligera y potente que transforma un campo de texto simple en un calendario interactivo. 
        Se esta usando Flatpickr para transformar los campos de texto de fecha de tu widget de reserva en calendarios interactivos, fáciles de usar y configurados en español.

4. **Font Awesome (Librería)**: Proporciona un amplio conjunto de iconos vectoriales para usar en tu página web.
        Los iconos guían al usuario, refuerzan acciones (como la confirmación de la reserva) y hacen que la información (como las características de una habitación) sea más fácil de digerir.




## ----------- Contenido de cada archivo generado -----------

index.html: Es la página principal del hotel. Permite a los usuarios ver ofertas, buscar habitaciones y usar modales para iniciar sesión o registrarse. Es visualmente atractiva y funcional.

dashboard.html: Es un panel de análisis de datos. Muestra métricas web importantes a través de gráficos, con una navegación clara que permite cambiar entre diferentes vistas.

app.js: Es el cerebro que da vida a las partes interactivas de ambas páginas. Su diseño es inteligente, ya que puede funcionar en ambos archivos HTML sin generar errores. El cual no solo se encarga de efectos visuales, sino que gestiona la lógica clave de la aplicación.
 - Flujo de Reserva Completo
 - Validación del Lado del Cliente.
 - Navegación Sincronizada en el Dashboard.

Se ha implementado características complejas de manera efectiva, como los modales, los selectores de fecha, el carrusel y la validación de formularios.



## ----------- Calidad del Código y Buenas Prácticas -----------

- **Nomenclatura Clara**: Usa nombres de variables y id descriptivos (confirmarReservaBtn, fechaLlegadaSeleccionada, panel-principal), lo que hace que el código sea muy fácil de leer y entender.
- **Reutilización de Estilos**: Ha sido eficiente al reutilizar clases y estilos. Por ejemplo, los estilos de los enlaces de navegación en el menú del dashboard.html son consistentes para la vista móvil y de escritorio, lo que evita la duplicación de código CSS.
- **Interactividad y Feedback**: Pequeños detalles como los efectos hover en los botones y enlaces, y el cambio del ícono del ojo para mostrar/ocultar contraseñas, mejoran la interacción y comunican claramente al usuario lo que está sucediendo.



# ----------- Puntos extra de archivos extra -----------

**img**
- Dentro de esta carpeta se esta almacenando todas las imagenes que se esta usando en este proyecto.

**.vscode**
- Dentro de esta carpeta existe el __settings.json__: Ese código le dice a la extensión "Live Server" que se ejecute en el puerto 5501 para este proyecto en específico.
- Su función principal es crear un pequeño servidor de desarrollo local que actualiza automáticamente tu página en el navegador cada vez que guardas un cambio en tus archivos (HTML, CSS, JS). Esto te ahorra tener que recargar la página manualmente a cada rato.





# ----------- Arquitectura Proyecto -----------

                [ Usuario (Cliente/Administrador) ]
                                |
                                |
         +----------------------+----------------------+
         |                                             |
[ index.html ]                                 [ dashboard.html ]
(Sitio Público)                                (Panel Privado)
    |                                                |
    |--- Bootstrap (Layout)                          |--- Bootstrap (Layout)
    |--- Flatpickr (Fechas)                          |--- Chart.js (Gráficos)
    |--- Font Awesome (Iconos)                       |
    |                                                |
    +-----------------------+------------------------+
                            |
                            |
                      [ app.js ]
              (Lógica y Orquestación)
                      |
                      |--- Manejo de Eventos (Clicks, etc.)
                      |--- Lógica de Reserva y Validación
                      |--- Inicialización de Modales
                      |--- Control de Paneles del Dashboard