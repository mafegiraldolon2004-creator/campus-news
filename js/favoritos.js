// Obtener las noticias guardadas
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


// Cargar todas las noticias
fetch("data/noticias.json")
    .then(respuesta => respuesta.json())
    .then(noticias => {

        // Buscar cuáles noticias están guardadas
        const noticiasFavoritas = noticias.filter(noticia =>
            favoritos.includes(noticia.id)
        );

        mostrarFavoritos(noticiasFavoritas);
    })
    .catch(error => {
        console.log("Error al cargar los favoritos:", error);
    });


// Mostrar las noticias favoritas
function mostrarFavoritos(noticias) {

    const contenedor = document.getElementById("lista-favoritos");

    // Mostrar mensaje cuando no hay favoritos
    if (noticias.length === 0) {

        contenedor.innerHTML = `
            <div class="sin-favoritos">
                <h2>No tienes noticias favoritas</h2>
                <p>Guarda las noticias que quieras consultar más adelante.</p>

                <a href="noticias.html" class="boton">
                    Ver noticias
                </a>
            </div>
        `;

        return;
    }


    // Mostrar las noticias guardadas
    noticias.forEach(noticia => {

        contenedor.innerHTML += `
            <article class="tarjeta">

                <img src="${noticia.imagen}" alt="${noticia.titulo}">

                <div class="tarjeta-contenido">

                    <span class="categoria">
                        ${noticia.categoria}
                    </span>

                    <h3>${noticia.titulo}</h3>

                    <p>${noticia.descripcion}</p>

                    <a href="detalle.html?id=${noticia.id}">
                        Leer más →
                    </a>

                </div>

            </article>
        `;
    });
}