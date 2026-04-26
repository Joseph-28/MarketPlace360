// Renderizar vendedores
function renderVendedores() {
    const contenedor = document.getElementById("contenedorVendedores");

    contenedor.innerHTML = "";
    const vendedoresOrdenados = [...vendedoresData].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    );

    vendedoresOrdenados.forEach(vendedor => {
        const article = document.createElement("article");
        article.classList.add("Vendedor");
        article.dataset.categoria = vendedor.categoria;

        article.innerHTML = `
            <figure>
                <img src="${vendedor.imagen}" alt="Logo de ${vendedor.nombre}" width="64">
            </figure>
            <h4>${vendedor.nombre}</h4>
            <p>Categoría: ${vendedor.categoria}</p>
            <p>Calificación: <p class="estrellas">${generarEstrellas(vendedor.calificacion)}</p></p>
            <a href="catalogo.html" class="ver_productos" data-tienda="${vendedor.nombre}">
                Ver productos
            </a>
        `;

        contenedor.appendChild(article);
    });
}
//filtro
function filtrarVendedores() {

    const vendedores = document.querySelectorAll(".Vendedor");

    const seleccion = document.querySelector('input[name="categoria_vendedor"]:checked');

    const categoria = seleccion ? seleccion.value : null;

    vendedores.forEach(v => {

        const categoriaVendedor = v.dataset.categoria;

        let mostrar = true;

        if (categoria && categoriaVendedor !== categoria) {
            mostrar = false;
        }

        v.style.display = mostrar ? "flex" : "none";
    });
}
// Iniciar
document.addEventListener("DOMContentLoaded", renderVendedores);
//Click en ver productos
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("ver_productos")) {

        const tienda = e.target.dataset.tienda;

        localStorage.setItem("tiendaSeleccionada", tienda);
        window.location.href = "catalogo.html";
    }
});
//Filtro
document.addEventListener("change", (e) => {
    if (e.target.matches("input[name='categoria_vendedor']")) {
        filtrarVendedores();
    }
});