//Utilizar estrellas
document.addEventListener("DOMContentLoaded", () => {

    const estrellas = document.querySelectorAll("#estrellas i");
    const input = document.getElementById("calificacion");

    estrellas.forEach(estrella => {

        estrella.addEventListener("click", () => {

            const valor = estrella.dataset.valor;
            input.value = valor;

            estrellas.forEach(e => {
                e.classList.remove("fa-solid", "activa");
                e.classList.add("fa-regular");
            });

            for (let i = 0; i < valor; i++) {
                estrellas[i].classList.remove("fa-regular");
                estrellas[i].classList.add("fa-solid", "activa");
            }

        });

    });

});
//Cargar reseñas
function cargarResenias() {

    const contenedor = document.getElementById("contenedor_resenias");
    tienda.forEach(resena => {
        const article = document.createElement("article");

        article.innerHTML = `
            <h2>${resena.Titulo}</h2>
            <p>"${resena.Comentario}"</p>
            
            <section class="user_info">
                <figure>
                    <img src="img/image-solid.png" alt="Usuario" width="64">
                </figure>
                <section class="user_meta">
                    <strong>${resena.nombre}</strong><br>
                    <span>${resena.fecha}</span><br>
                    <span class="estrellas_valoracion">${generarEstrellas(resena.Estrellas)}</span>
                </section>
            </section>
        `;

        contenedor.appendChild(article);

    });

}
//Usuario logeado
document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuarioActivo();

    if (usuario) {

        const inputNombre = document.getElementById("nombre");
        const inputCorreo = document.getElementById("correo");

        inputNombre.value = usuario.nombre;
        inputCorreo.value = usuario.correo;

        // Bloquear edición
        inputNombre.readOnly = true;
        inputCorreo.readOnly = true;

        //Estilo visual de bloqueado
        inputNombre.classList.add("input_bloqueado");
        inputCorreo.classList.add("input_bloqueado");
    }

});
document.addEventListener("DOMContentLoaded", () => {
    cargarResenias();
});