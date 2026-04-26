// Paginas tablas
function paginarTablas() {

    const tablas = document.querySelectorAll(".tabla");

    tablas.forEach((tabla, index) => {

        const filas = tabla.querySelectorAll(".fila:not(.encabezado)");
        const contenedor = tabla.querySelector("#paginacion ul");

        if (!contenedor || filas.length === 0) return;

        const itemsPorPagina = 5;
        const totalPaginas = Math.ceil(filas.length / itemsPorPagina);

        // Clave por tabla
        const storageKey = "paginaTabla_" + index;

        let paginaActual = sessionStorage.getItem(storageKey)
            ? parseInt(sessionStorage.getItem(storageKey))
            : 1;

        function mostrarFilas() {
            filas.forEach((fila, i) => {

                const inicio = (paginaActual - 1) * itemsPorPagina;
                const fin = inicio + itemsPorPagina;

                if (i >= inicio && i < fin) {
                    fila.style.display = "grid";

                    // Animación
                    fila.style.opacity = "0";
                    fila.style.transform = "translateY(10px)";

                    setTimeout(() => {
                        fila.style.transition = "all 0.3s ease";
                        fila.style.opacity = "1";
                        fila.style.transform = "translateY(0)";
                    }, 50);

                } else {
                    fila.style.display = "none";
                }
            });
        }

        function cambiarPagina(nuevaPagina) {
            paginaActual = nuevaPagina;
            sessionStorage.setItem(storageKey, paginaActual);
            render();
        }

        function render() {
            contenedor.innerHTML = "";
            mostrarFilas();

            if (totalPaginas === 1) {
                const li = document.createElement("li");
                li.textContent = "1";
                li.classList.add("activo");
                contenedor.appendChild(li);
                return;
            }

            // Anterior
            if (paginaActual > 1) {
                const liAnterior = document.createElement("li");
                liAnterior.innerHTML = `<a href="#">Anterior</a>`;
                liAnterior.onclick = (e) => {
                    e.preventDefault();
                    cambiarPagina(paginaActual - 1);
                };
                contenedor.appendChild(liAnterior);
            }

            // Numeros
            for (let i = 1; i <= totalPaginas; i++) {

                if (
                    i === 1 ||
                    i === totalPaginas ||
                    (i >= paginaActual - 1 && i <= paginaActual + 1)
                ) {
                    const li = document.createElement("li");

                    if (i === paginaActual) {
                        li.textContent = i;
                        li.classList.add("activo");
                    } else {
                        li.innerHTML = `<a href="#">${i}</a>`;
                        li.onclick = (e) => {
                            e.preventDefault();
                            cambiarPagina(i);
                        };
                    }

                    contenedor.appendChild(li);
                }

                if (
                    (i === 2 && paginaActual > 3) ||
                    (i === totalPaginas - 1 && paginaActual < totalPaginas - 2)
                ) {
                    const liDots = document.createElement("li");
                    liDots.textContent = "...";
                    contenedor.appendChild(liDots);
                }
            }

            // Siguiente
            if (paginaActual < totalPaginas) {
                const liSiguiente = document.createElement("li");
                liSiguiente.innerHTML = `<a href="#">Siguiente</a>`;
                liSiguiente.onclick = (e) => {
                    e.preventDefault();
                    cambiarPagina(paginaActual + 1);
                };
                contenedor.appendChild(liSiguiente);
            }
        }

        render();
    });
}
// Ejecutar
document.addEventListener("DOMContentLoaded", paginarTablas);
