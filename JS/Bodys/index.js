document.addEventListener("DOMContentLoaded", () => {
    // Configuración de que cargar
    const datosParaCargar = [
        {
            id: "destacados",
            datos: productosData.filter(p => p.valoracion === 5),
            tipo: "producto"
        },
        {
            id: "temporada",
            datos: productosData.filter(p => p.precio <= 10000),
            tipo: "producto"
        },
        {
            id: "vendedores",
            datos: vendedoresData.filter(v => parseFloat(v.calificacion) >= 4.5),
            tipo: "vendedor"
        },
        {
            id: "noticias",
            datos: noticias,
            tipo: "noticia"
        },
        {
            id: "resena",
            datos: tienda,
            tipo: "resena"
        }
    ];

    // Renderizar cada sección
    datosParaCargar.forEach(seccion => {

        const contenedor = document.getElementById(seccion.id);
        if (!contenedor) {
            console.warn("No existe contenedor:", seccion.id);
            return;
        }

        const track = contenedor.querySelector(".carrucel_track");
        if (!track) {
            console.warn("No existe track en:", seccion.id);
            return;
        }

        renderItems(seccion.datos, track, seccion.tipo);
    });
    //Carusel
    requestAnimationFrame(() => {
        inicializarCarruseles();
    });


});

function renderItems(data, track, tipo) {

    track.innerHTML = "";

    data.forEach(item => {

        const article = document.createElement("article");

        if (tipo === "producto") {

            article.innerHTML = `
                <h4>${item.titulo}</h4>
                <figure>
                    <img src="${item.imagen}" alt="${item.titulo}" width="200">
                </figure>
                <p>₡${item.precio.toLocaleString()}</p>
                <p>${item.info}</p>
                <section>
                    <a href="#" class="btn ver_detalles_inicio">Detalles</a>
                </section>
            `;
            const boton = article.querySelector(".ver_detalles_inicio");

            if (boton) {
                boton.addEventListener("click", (e) => {
                    e.preventDefault();

                    // Guardar producto igual que el buscador
                    localStorage.setItem("productoSeleccionado", JSON.stringify(item));

                    // Redirigir al catálogo
                    window.location.href = "HTML/es/catalogo.html";
                });
            }
        } else if (tipo === "vendedor") {
            article.innerHTML = `
                <h4>${item.nombre}</h4>
                <figure>
                    <img src="${item.imagen}" alt="${item.nombre}" width="200">
                </figure>
                <p>Categoría: ${item.categoria}</p>
                <p class="estrellas">${generarEstrellas(item.calificacion)}</p>
                <section>
                    <a href="#" class="btn ver_productos">Ver Productos</a>
                </section>
            `;
            const boton = article.querySelector(".ver_productos");

            boton.addEventListener("click", (e) => {
                e.preventDefault();

                // Guardar tienda
                localStorage.setItem("tiendaSeleccionada", item.nombre);

                // Redirigir al catálogo
                window.location.href = "HTML/es/catalogo.html";
            });
        }
        else if (tipo === "noticia") {
            article.innerHTML = `
            <h4>${item.titulo}</h4>
            <p><strong>Fecha:</strong> ${item.fecha}</p>
            <section>
                <a href="#" class="btn ver_noticia">Ver noticia</a>
            </section>
        `;
            const boton = article.querySelector(".ver_noticia");

            boton.addEventListener("click", (e) => {
                e.preventDefault();

                // Guardar noticia
                localStorage.setItem("noticiaSeleccionada", JSON.stringify(item));

                // Redirigir al blog
                window.location.href = "HTML/es/blog.html";
            });

        }
        else if (tipo === "resena") {

            article.innerHTML = `
            <h4>${item.Titulo}</h4>
            <p>${item.Comentario}</p>
            <p class="estrellas">${generarEstrellas(item.Estrellas)}</p>
            `;

        }
        track.appendChild(article);
    });
}