// Obtener el formulario
const formulario = document.getElementById("formulario");
const mensajeFormulario = document.getElementById("mensaje-formulario");


// Validar el formulario al enviarlo
formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();


    // Verificar que todos los campos estén completos
    if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {

        mensajeFormulario.textContent =
            "Por favor, completa todos los campos.";

        mensajeFormulario.style.color = "red";

        return;
    }


    // Verificar que el correo tenga un formato válido
    if (!correo.includes("@") || !correo.includes(".")) {

        mensajeFormulario.textContent =
            "Por favor, escribe un correo electrónico válido.";

        mensajeFormulario.style.color = "red";

        return;
    }


    // Mensaje de confirmación
    mensajeFormulario.textContent =
        "¡Mensaje enviado correctamente! Gracias por contactarnos.";

    mensajeFormulario.style.color = "green";


    // Limpiar el formulario
    formulario.reset();
});
