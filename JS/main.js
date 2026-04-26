//Abrir máximo un details a la vez en el header
function activarDetails() {
    //Cerrar al dar click en otro details
    const detailsList = document.querySelectorAll("aside details");
    detailsList.forEach(detail => {
        detail.addEventListener("click", function () {
            setTimeout(() => {
                if (this.open) {
                    detailsList.forEach(other => {
                        if (other !== this) {
                            other.open = false;
                        }
                    });
                }
            }, 0);
        });
    });
    //Cerrar al dar click fuera
    document.addEventListener("click", (e) => {
        detailsList.forEach(detail => {
            if (!detail.contains(e.target)) {
                detail.open = false;
            }
        });
    });
}
//Alertas
function mostraralerta(mensaje, tipo = "success") {
    const alerta = document.getElementById("alerta");

    let icono = "";

    if (tipo === "success") {
        icono = '<i class="fa-solid fa-check"></i>';
    } else if (tipo === "error") {
        icono = '<i class="fa-solid fa-xmark"></i>';
    }

    alerta.innerHTML = `${mensaje} ${icono}`;
    alerta.className = "alerta show " + tipo;

    setTimeout(() => {
        alerta.classList.remove("show");
    }, 3000);
}
// Obtener Usuario activo
function obtenerUsuarioActivo() {
    return JSON.parse(sessionStorage.getItem("usuarioActivo"));
}
//Buscador
function activarBuscador() {

    const input = document.getElementById("inputBusqueda");
    const resultados = document.getElementById("resultadosBusqueda");
    const form = document.querySelector(".buscador");

    if (!input || !resultados) return;

    // Evitar recarga del form
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    }

    input.addEventListener("input", function () {

        const texto = input.value.toLowerCase().trim();
        resultados.innerHTML = "";

        if (texto === "") {
            resultados.style.display = "none";
            return;
        }

        let hayResultados = false;

        productosData.forEach(producto => {

            const nombre = producto.titulo.toLowerCase();
            const descripcion = producto.info.toLowerCase();

            if (nombre.includes(texto) || descripcion.includes(texto)) {

                hayResultados = true;

                const item = document.createElement("section");
                item.classList.add("resultado_item");

                item.innerHTML = `
                    <img src="${producto.imagen}" class="resultado_img">
                    <span>${producto.titulo}</span>
                `;

                item.addEventListener("click", () => {
                    // Guardar producto en localStorage
                    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
                    // Ir al catálogo
                    window.location.href = "/HTML/es/catalogo.html";
                });
                resultados.appendChild(item);
            }
        });

        resultados.style.display = hayResultados ? "block" : "none";
    });
}
// Cerrar seccion
function activarLogout() {
    const btnLogout = document.getElementById("btn_logout");

    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();

            sessionStorage.removeItem("usuarioActivo");

            mostraralerta("Sesión cerrada", "success");
            setTimeout(() => {
                window.location.href = "/HTML/es/registro_login.html";
            }, 2000);
        });
    }
}
// Convertir número a estrellas
function generarEstrellas(valor) {
    const entero = Math.floor(valor);
    const decimal = valor % 1;

    let estrellasHTML = "";

    // Estrellas llenas
    for (let i = 0; i < entero; i++) {
        estrellasHTML += '<i class="fa-solid fa-star"></i>';
    }

    // Media estrella
    if (decimal >= 0.5) {
        estrellasHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    // Estrellas vacias
    const restantes = 5 - Math.ceil(valor);
    for (let i = 0; i < restantes; i++) {
        estrellasHTML += '<i class="fa-regular fa-star"></i>';
    }

    return estrellasHTML;
}
//Iniciar funciones
document.addEventListener("DOMContentLoaded", activarDetails);
//Popups
document.addEventListener("DOMContentLoaded", () => {
    modalArticulos();
    modalProductos();
    const modal = document.getElementById("modal");
    const cerrar = document.querySelector(".cerrar");

    cerrar.addEventListener("click", () => {
        modal.classList.remove("activo");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("activo");
        }
    });
});
//Boton default
document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".btn_default");

    botones.forEach(btn => {

        const form = btn.closest("form");

        if (form) {
            let enviado = false;

            form.addEventListener("submit", (e) => {

                if (enviado) return;

                if (!form.checkValidity()) return;

                e.preventDefault();

                mostraralerta("Acción realizada con éxito", "success");

                enviado = true;

                setTimeout(() => {
                    form.requestSubmit();
                }, 3000);
            });

        } else {
            btn.addEventListener("click", () => {

                mostraralerta("Acción realizada con éxito", "success");

                setTimeout(() => {
                    window.location.href = "#";
                }, 3000);

            });
        }

    });

});
