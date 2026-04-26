//Ver detalles
function modalProductos() {

    // Detectar botone
    const botones = document.querySelectorAll(".ver_detalles");

    const modal = document.getElementById("modal");

    const titulo = document.getElementById("modal_titulo");
    const texto = document.getElementById("modal_texto");
    const imagen = document.getElementById("modal_imagen");
    const precio = document.getElementById("modal_precio");
    const tamano = document.getElementById("modal_tamano");
    const colores = document.getElementById("modal_colores");
    const marca = document.getElementById("modal_marca");
    const tienda = document.getElementById("modal_tienda");
    const stock = document.getElementById("modal_stock");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();

            //Detectar tipo
            const producto = boton.closest(".producto");

            // Productos
            if (producto) {
                const img = producto.querySelector("figure img");
                const cantidad = document.getElementById("modal_cantidad");
                const fecha = document.getElementById("modal_fecha");
                const valoracion = document.getElementById("modal_valoracion");

                imagen.src = img.src;
                imagen.alt = img.alt;

                if (titulo) titulo.textContent = producto.dataset.titulo;
                if (fecha) fecha.textContent = producto.dataset.fecha;
                if (texto) texto.innerHTML = producto.dataset.info;
                if (precio) precio.textContent = "₡" + producto.dataset.precio;
                if (tamano) tamano.textContent = producto.dataset.tamano;
                if (colores) colores.textContent = producto.dataset.colores;
                if (marca) marca.textContent = producto.dataset.marca;
                if (tienda) tienda.textContent = producto.dataset.tienda;
                if (stock) stock.textContent = producto.dataset.stock;

                //Cantidades para el select
                if (cantidad) {
                    cantidad.innerHTML = "";

                    const stockDisponible = parseInt(producto.dataset.stock);

                    // Convertir valoración en estrellas
                    if (valoracion) {
                        const estrellas = parseFloat(producto.dataset.valoracion);
                        let estrellasHTML = "";

                        const enteras = Math.floor(estrellas);
                        const decimal = estrellas % 1;
                        for (let i = 0; i < enteras; i++) {
                            estrellasHTML += '<i class="fa-solid fa-star"></i>';
                        }

                        if (decimal >= 0.5) {
                            estrellasHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
                        }

                        const restantes = 5 - Math.ceil(estrellas);
                        for (let i = 0; i < restantes; i++) {
                            estrellasHTML += '<i class="fa-regular fa-star"></i>';
                        }

                        valoracion.innerHTML = estrellasHTML;
                    }

                    for (let i = 1; i <= stockDisponible; i++) {
                        const option = document.createElement("option");
                        option.value = i;
                        option.textContent = i;
                        cantidad.appendChild(option);
                    }

                    if (stockDisponible === 0) {
                        cantidad.innerHTML = "<option>Sin stock</option>";
                        cantidad.disabled = true;
                    }
                }
            }
            modal.classList.add("activo");
        });
    });
}
//Cargar desde productos.js
function renderizarProductos() {

    const contenedor = document.querySelector(".productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productosData.forEach(p => {

        const article = document.createElement("article");
        article.classList.add("producto");

        //Ajuste para dataset
        article.dataset.categoria = p.categoria;
        article.dataset.titulo = p.titulo;
        article.dataset.precio = p.precio;
        article.dataset.info = p.info;
        article.dataset.tamano = p.tamano;
        article.dataset.colores = p.colores;
        article.dataset.marca = p.marca;
        article.dataset.tienda = p.tienda;
        article.dataset.stock = p.stock;
        article.dataset.fecha = p.fecha;
        article.dataset.valoracion = p.valoracion;

        article.innerHTML = `
            <figure>
                <img src="${p.imagen}" alt="${p.titulo}" height="125">
            </figure>
            <h3>${p.titulo}</h3>
            <p class="precio">₡${p.precio.toLocaleString()}</p>
            <p class="info">${p.info}</p>
            <button class="ver_detalles">Ver detalles <i class="fa-solid fa-eye"></i></button>
        `;

        contenedor.appendChild(article);
    });
}
//Obtener Productos
function obtenerProductosBase() {
    return Array.from(document.querySelectorAll(".producto"));
}
// Sincronizar categorías mediante el URL
function sincronizarCategoriaURL() {
    const params = new URLSearchParams(window.location.search);
    const categoriaURL = params.get("categoria");

    if (!categoriaURL) return;

    document.querySelectorAll("input[name='categoria']")
        .forEach(chk => {
            chk.checked = chk.value === categoriaURL;
        });
}
//Actualizar precio dinamico
function actualizarPrecio(productos) {
    const precios = productos.map(p => parseInt(p.dataset.precio));
    if (precios.length === 0) return;

    const min = Math.min(...precios);
    const max = Math.max(...precios);

    const input = document.getElementById("precio");
    const texto = document.getElementById("precio_valor");

    input.min = min;
    input.max = max;
    input.value = max;


    texto.textContent = `₡${min} - ₡${input.value}`;
}
// Actualizar las tiendas
function actualizartiendas(productos) {
    const contenedor = document.getElementById("filtro_tiendas");

    const tiendas = new Set(productos.map(p => p.dataset.tienda));

    contenedor.innerHTML = "";

    tienda.forEach(tienda => {
        const label = document.createElement("label");

        label.innerHTML = `
            <input type="checkbox" name="tienda" value="${tienda}">
            ${tienda}
        `;

        contenedor.appendChild(label);
    });
}
// Actualizar las tiendas
function actualizarTiendas(productos) {
    const contenedor = document.getElementById("filtro_tiendas");

    const tiendas = new Set(productos.map(p => p.dataset.tienda));

    contenedor.innerHTML = "";

    tiendas.forEach(tienda => {
        const label = document.createElement("label");

        label.innerHTML = `
            <input type="checkbox" name="tienda" value="${tienda}">
            ${tienda}
        `;

        contenedor.appendChild(label);
    });
}
// Actualizar las marcas
function actualizarMarcas(productos) {
    const contenedor = document.getElementById("filtro_marcas");

    const marcas = new Set(productos.map(p => p.dataset.marca));

    contenedor.innerHTML = "";

    marcas.forEach(marca => {
        const label = document.createElement("label");

        label.innerHTML = `
            <input type="checkbox" name="marca" value="${marca}">
            ${marca}
        `;

        contenedor.appendChild(label);
    });
}
// Obtener productos por categoría
function filtrarPorCategoriaBase() {
    const categoriasSeleccionadas = Array.from(
        document.querySelectorAll("input[name='categoria']:checked")
    ).map(i => i.value);

    return obtenerProductosBase().filter(p => {
        if (categoriasSeleccionadas.length === 0) return true;
        return categoriasSeleccionadas.includes(p.dataset.categoria);
    });
}
// Aplicar los filtros
function aplicarFiltros() {
    const productos = obtenerProductosBase();

    const precioMax = parseInt(document.getElementById("precio").value);

    const categorias = Array.from(
        document.querySelectorAll("input[name='categoria']:checked")
    ).map(i => i.value);

    const tiendas = Array.from(
        document.querySelectorAll("input[name='tienda']:checked")
    ).map(i => i.value);

    const marcas = Array.from(
        document.querySelectorAll("input[name='marca']:checked")
    ).map(i => i.value);

    productos.forEach(p => {
        const precio = parseInt(p.dataset.precio);
        const categoria = p.dataset.categoria;
        const tienda = p.dataset.tienda;
        const marca = p.dataset.marca;

        let mostrar = true;

        if (precio > precioMax) mostrar = false;

        if (categorias.length > 0 && !categorias.includes(categoria)) {
            mostrar = false;
        }

        if (tiendas.length > 0 && !tiendas.includes(tienda)) {
            mostrar = false;
        }

        if (marcas.length > 0 && !marcas.includes(marca)) {
            mostrar = false;
        }

        p.style.display = mostrar ? "flex" : "none";
    });
    ordenarProductos();
}
// Recalcular al actualizar
function recalcularFiltros() {
    const productosCategoria = filtrarPorCategoriaBase();

    actualizarPrecio(productosCategoria);
    actualizarMarcas(productosCategoria);
    actualizarTiendas(productosCategoria);

    aplicarFiltros();
}
// Ordenar productos
function ordenarProductos() {
    const contenedor = document.querySelector(".productos");
    const productos = Array.from(document.querySelectorAll(".producto"));

    const ordenSeleccionado = document.querySelector("input[name='orden']:checked");
    if (!ordenSeleccionado) return;

    const valor = ordenSeleccionado.value;

    function parseFecha(fechaStr) {
        const [dia, mes, anio] = fechaStr.split(/[-/]/);
        return new Date(anio, mes - 1, dia);
    }

    productos.sort((a, b) => {
        const precioA = parseInt(a.dataset.precio);
        const precioB = parseInt(b.dataset.precio);

        const fechaA = parseFecha(a.dataset.fecha);
        const fechaB = parseFecha(b.dataset.fecha);

        const valoracionA = parseInt(a.dataset.valoracion);
        const valoracionB = parseInt(b.dataset.valoracion);

        switch (valor) {
            case "asc":
                return precioA - precioB;

            case "desc":
                return precioB - precioA;

            case "nuevo":
                return fechaB - fechaA;

            case "valorados":
                return valoracionB - valoracionA;

            default:
                return 0;
        }
    });

    productos.forEach(p => contenedor.appendChild(p));
}
//Filtros por fecha dia/mes/año para ordenar
function parseFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split(/[-/]/);
    return new Date(anio, mes - 1, dia);
}
//Iniciar
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    modalProductos();
    sincronizarCategoriaURL();
    recalcularFiltros();

    document.querySelectorAll("input[name='categoria']")
        .forEach(input => input.addEventListener("change", recalcularFiltros));
    document.querySelectorAll("input[name='tienda']")
        .forEach(input => input.addEventListener("change", aplicarFiltros));
    document.querySelectorAll("input[name='marca']")
        .forEach(input => input.addEventListener("change", aplicarFiltros));

    const precioInput = document.getElementById("precio");
    const textoPrecio = document.getElementById("precio_valor");

    precioInput.addEventListener("input", () => {
        textoPrecio.textContent = `₡${precioInput.min} - ₡${precioInput.value}`;
        aplicarFiltros();
    });
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
//Iniciar tiendas
document.addEventListener("change", (e) => {
    if (e.target.matches("input[name='tienda']")) {
        aplicarFiltros();
    }
});
//Iniciar Marcas
document.addEventListener("change", (e) => {
    if (e.target.matches("input[name='marca']")) {
        aplicarFiltros();
    }
});
//Iniciar ordenamiento
document.addEventListener("change", (e) => {
    if (e.target.matches("input[name='orden']")) {
        ordenarProductos();
    }
});
//Cargar carrito de compras
document.addEventListener("DOMContentLoaded", () => {
    try {
        document.getElementById("agregar_carrito").addEventListener("click", () => {
            const producto = {
                nombre: document.getElementById("modal_titulo").textContent,
                precio: parseInt(
                    document.getElementById("modal_precio")
                        .textContent.replace(/[^\d]/g, "")
                ),
                imagen: document.getElementById("modal_imagen").src,
                cantidad: parseInt(document.getElementById("modal_cantidad").value),
                stock: parseInt(document.getElementById("modal_stock").textContent)
            };

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            //Agregar si existe
            const existe = carrito.find(p => p.nombre === producto.nombre);

            if (existe) {
                existe.cantidad = Number(existe.cantidad) + Number(producto.cantidad);
            } else {
                carrito.push({
                    ...producto,
                    cantidad: Number(producto.cantidad)
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            mostraralerta("Producto agregado al carrito", "success");
        });

    } catch (error) {
        mostraralerta("No se pudo agregar al carrito", "error");
    }

});
//Cargar desde buscador
document.addEventListener("DOMContentLoaded", function () {

    const productoGuardado = localStorage.getItem("productoSeleccionado");

    if (!productoGuardado) return;

    const producto = JSON.parse(productoGuardado);

    // Buscar el producto en el DOM
    const productos = document.querySelectorAll(".producto");

    productos.forEach(p => {

        if (
            p.dataset.titulo === producto.titulo &&
            p.dataset.tienda === producto.tienda
        ) {
            const boton = p.querySelector(".ver_detalles");

            if (boton) {
                boton.click();
            }
        }
    });

    // Limpiar para que no se repita
    localStorage.removeItem("productoSeleccionado");
});
//Cargar desde dirrectorio de vendedores
document.addEventListener("DOMContentLoaded", function () {

    const tiendaGuardada = localStorage.getItem("tiendaSeleccionada");

    if (!tiendaGuardada) return;

    // Buscar todos los checkboxes de tienda
    const checkboxes = document.querySelectorAll('input[name="tienda"]');

    checkboxes.forEach(cb => {
        if (cb.value === tiendaGuardada) {

            // Simular click
            cb.checked = true;
            cb.dispatchEvent(new Event("change"));
        }
    });

    // Limpiar
    localStorage.removeItem("tiendaSeleccionada");
});