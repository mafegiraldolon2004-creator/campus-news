// Obtener el número de la noticia desde la URL
const parametros = new URLSearchParams(window.location.search);
const idNoticia = Number(parametros.get("id"));


// Cargar las noticias
fetch("data/noticias.json")
    .then(respuesta => respuesta.json())
    .then(noticias => {

        // Buscar la noticia seleccionada
        const noticia = noticias.find(item => item.id === idNoticia);

        mostrarDetalle(noticia);
    })
    .catch(error => {
        console.log("Error al cargar la noticia:", error);
    });


// Mostrar la información completa de la noticia
function mostrarDetalle(noticia) {

    const contenedor = document.getElementById("detalle-noticia");

    if (!noticia) {
        contenedor.innerHTML = "<p>No se encontró la noticia.</p>";
        return;
    }

    contenedor.innerHTML = `
        <a href="noticias.html" class="volver">
            ← Volver a noticias
        </a>

        <span class="categoria">
            ${noticia.categoria}
        </span>

        <h1>${noticia.titulo}</h1>

        <p class="descripcion-detalle">
            ${noticia.descripcion}
        </p>

        <img src="${noticia.imagen}"
             alt="${noticia.titulo}"
             class="imagen-detalle">

        <div class="contenido-noticia">
            <p>${noticia.contenido}</p>
        </div>

        <button id="boton-favorito" class="boton">
            ♡ Agregar a favoritos
        </button>
    `;

    revisarFavorito(noticia.id);

    const boton = document.getElementById("boton-favorito");

    boton.addEventListener("click", function () {
        guardarFavorito(noticia.id);
    });
}


// Guardar o quitar una noticia de favoritos
function guardarFavorito(id) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(favorito => favorito !== id);

    } else {

        favoritos.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    revisarFavorito(id);
}


// Cambiar el texto del botón
function revisarFavorito(id) {

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const boton = document.getElementById("boton-favorito");

    if (favoritos.includes(id)) {

        boton.textContent = "♥ Guardado en favoritos";

    } else {

        boton.textContent = "♡ Agregar a favoritos";
    }
}