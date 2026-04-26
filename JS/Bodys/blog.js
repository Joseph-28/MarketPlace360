//Paginacion de articulos 
function paginarArticulos() {
    const articulos = document.querySelectorAll(".articulo");
    const contenedor = document.querySelector("#paginacion ul");

    const itemsPorPagina = 3;
    const totalPaginas = Math.ceil(articulos.length / itemsPorPagina);

    //Guardar pagina mientras no se cierre pestaña, si no existe pagina guardada empieza en uno
    let paginaActual = sessionStorage.getItem("pagina")
        ? parseInt(sessionStorage.getItem("pagina"))
        : 1;

    function mostrarArticulos() {
        articulos.forEach((articulo, index) => {
            const inicio = (paginaActual - 1) * itemsPorPagina;
            const fin = inicio + itemsPorPagina;

            if (index >= inicio && index < fin) {
                articulo.style.display = "flex";

                //Animacion
                articulo.style.opacity = "0";
                articulo.style.transform = "translateY(10px)";

                setTimeout(() => {
                    articulo.style.transition = "all 0.3s ease";
                    articulo.style.opacity = "1";
                    articulo.style.transform = "translateY(0)";
                }, 50);

            } else {
                articulo.style.display = "none";
            }
        });
    }

    function cambiarPagina(nuevaPagina) {
        paginaActual = nuevaPagina;

        //Guardar en sesion
        sessionStorage.setItem("pagina", paginaActual);

        render();
    }

    function render() {
        contenedor.innerHTML = "";

        mostrarArticulos();

        //Si solo hay 1 página
        if (totalPaginas === 1) {
            const li = document.createElement("li");
            li.textContent = "1";
            li.classList.add("activo");
            contenedor.appendChild(li);
            return;
        }

        // Pagina anterior
        if (paginaActual > 1) {
            const liAnterior = document.createElement("li");
            liAnterior.innerHTML = `<a href="#">Anterior</a>`;
            liAnterior.onclick = (e) => {
                e.preventDefault();
                cambiarPagina(paginaActual - 1);
            };
            contenedor.appendChild(liAnterior);
        }

        // Números de la paginación 
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

            // Puntos suspensivos si hay muchas páginas
            if (
                (i === 2 && paginaActual > 3) ||
                (i === totalPaginas - 1 && paginaActual < totalPaginas - 2)
            ) {
                const liDots = document.createElement("li");
                liDots.textContent = "...";
                contenedor.appendChild(liDots);
            }
        }

        // Pagina siguiente
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
}

//Leer más
function modalArticulos() {

    // Detectar los botone
    const botones = document.querySelectorAll(".leer_mas");

    const modal = document.getElementById("modal");

    // Campos
    const titulo = document.getElementById("modal_titulo");
    const texto = document.getElementById("modal_texto");
    const imagen = document.getElementById("modal_imagen");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();

            //Detectar tipo
            const articulo = boton.closest(".articulo, .articulo_destacado");

            // Articulos
            if (articulo) {

                const tituloArticulo = articulo.querySelector("h2").textContent;
                const textoArticulo = articulo.querySelector(".detalles").innerHTML;
                const img = articulo.querySelector("figure img");

                titulo.textContent = tituloArticulo;
                texto.innerHTML = textoArticulo;
                imagen.src = img.src;
                imagen.alt = img.alt;
            }
            modal.classList.add("activo");
        });
    });
}

//Cargar noticias
function cargarNoticias() {

    // Destacada
    const contDestacada = document.getElementById("noticia_destacada");

    contDestacada.innerHTML = `
        <article class="articulo_destacado">
            <figure>
                <img src="${noticiaDestacada.imagen}" alt="${noticiaDestacada.alt}" width="128">
            </figure>
            <article class="contenido">
                <h2>${noticiaDestacada.titulo}</h2>
                <p><strong>Autor:</strong> ${noticiaDestacada.autor}</p>
                <p><strong>Fecha:</strong> ${noticiaDestacada.fecha}</p>
                <p class="detalles">${noticiaDestacada.contenido}</p>
                <a href="#" class="leer_mas">Leer más</a>
            </article>
        </article>
    `;

    // Lista
    const contenedor = document.getElementById("contenedor_noticias");

    contenedor.innerHTML = "";

    noticias.forEach(noticia => {
        const articulo = document.createElement("article");
        articulo.classList.add("articulo");

        //Identificador de cada noticia
        articulo.dataset.titulo = noticia.titulo;

        articulo.innerHTML = `
            <article class="noticia">
                <figure>
                    <img src="${noticia.imagen}" alt="${noticia.alt}" width="128">
                </figure>
                <article class="contenido">
                    <h2>${noticia.titulo}</h2>
                    <p><strong>Autor:</strong> ${noticia.autor}</p>
                    <p><strong>Fecha:</strong> ${noticia.fecha}</p>
                    <p class="detalles">${noticia.contenido}</p>
                    <a href="#" class="leer_mas">Leer más</a>
                </article>
            </article>     
        `;

        contenedor.appendChild(articulo);
    });
}
//Cargar desde index
document.addEventListener("DOMContentLoaded", function () {
    const noticiaGuardada = localStorage.getItem("noticiaSeleccionada");

    if (!noticiaGuardada) return;
    const noticia = JSON.parse(noticiaGuardada);

    setTimeout(() => {

        const articulos = document.querySelectorAll(".articulo, .articulo_destacado");

        articulos.forEach(a => {

            if (a.dataset.titulo === noticia.titulo) {

                const boton = a.querySelector(".leer_mas");

                if (boton) {
                    boton.click();
                }
            }
        });

        // Limpiar
        localStorage.removeItem("noticiaSeleccionada");

    }, 200);
});
//
document.addEventListener("DOMContentLoaded", () => {
    cargarNoticias();
    paginarArticulos();
    modalArticulos();

    // Modal
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