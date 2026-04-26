//Poner reserva automaticamente
function cargarEventoReserva() {
    const botones = document.querySelectorAll(".btn_reservar");
    const select = document.getElementById("reserva");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const evento = this.getAttribute("data-evento");
            select.value = evento;
        });
    });
}
document.addEventListener("DOMContentLoaded", cargarEventoReserva);

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

