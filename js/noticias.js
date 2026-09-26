// Cargar las noticias desde el archivo JSON
fetch("data/noticias.json")
    .then(respuesta => respuesta.json())
    .then(noticias => {
        mostrarNoticiasDestacadas(noticias);
        mostrarTodasLasNoticias(noticias);
    })
    .catch(error => {
        console.log("Error al cargar las noticias:", error);
    });


// Mostrar las noticias destacadas en el inicio
function mostrarNoticiasDestacadas(noticias) {

    const contenedor = document.getElementById("noticias-destacadas");

    if (!contenedor) {
        return;
    }

    const destacadas = noticias.filter(noticia => noticia.destacada === true);

    destacadas.forEach(noticia => {

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


// Mostrar todas las noticias
function mostrarTodasLasNoticias(noticias) {

    const contenedor = document.getElementById("lista-noticias");

    if (!contenedor) {
        return;
    }

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