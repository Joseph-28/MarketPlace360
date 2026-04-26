//Cargar datos del carrito
function cargarCarrito() {

    const contenedor = document.querySelector(".carrito_izquierda");
    contenedor.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach((producto, index) => {

        const article = document.createElement("article");
        article.classList.add("producto");

        article.innerHTML = `
            <figure>
                <img src="${producto.imagen}" width="150">
            </figure>

            <section class="producto_detalles">
                <h3>${producto.nombre}</h3>
                <p><strong>${producto.precio}</strong></p>

                <label>Cantidad:</label>
                <select data-index="${index}" class="cantidad_select">
                    ${Array.from({ length: producto.stock }, (_, i) => i + 1)
                .map(n =>
                    `<option value="${n}" ${n == producto.cantidad ? "selected" : ""}>${n}</option>`
                ).join("")
            }
                </select>

                <button class="btn_eliminar" data-index="${index}">
                    Eliminar <i class="fa-solid fa-x"></i>
                </button>
            </section>
        `;

        contenedor.appendChild(article);
    });
    eventosCarrito();
    actualizarResumen()
}
//Eventos (Eliminar y cambiar cantidades)
function eventosCarrito() {

    // Eliminar producto
    document.querySelectorAll(".btn_eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;

            let carrito = JSON.parse(localStorage.getItem("carrito"));
            carrito.splice(index, 1);

            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarCarrito();
            actualizarResumen();
        });
    });

    // Cambiar las cantidades
    document.querySelectorAll(".cantidad_select").forEach(select => {
        select.addEventListener("change", () => {
            const index = select.dataset.index;

            let carrito = JSON.parse(localStorage.getItem("carrito"));
            carrito[index].cantidad = Number(select.value);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarResumen();
        });
    });
}
//Actualizar el resumen de compra
function actualizarResumen() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let subtotal = 0;
    let envio = 0;
    let descuento = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    envio = carrito.length * 3500;

    // Obtener código
    const inputCodigo = document.getElementById("codigo_descuento");
    const codigo = inputCodigo ? inputCodigo.value.trim() : "";

    // Validar código
    if (codigo.toLowerCase() === "marketplace360".toLowerCase()){
        descuento = envio;
        envio = 0;
    }

    const total = subtotal + envio;

    // Datos en el HTML
    document.getElementById("subtotal").textContent = "₡" + subtotal.toLocaleString();
    document.getElementById("envio").textContent = "₡" + envio.toLocaleString();
    document.getElementById("descuento").textContent = "-₡" + descuento.toLocaleString();
    document.getElementById("total").textContent = "₡" + total.toLocaleString();
}
//Iniciar eventos
document.addEventListener("DOMContentLoaded", cargarCarrito);
//Click en pagar
document.addEventListener("DOMContentLoaded", () => {

    const btnPagar = document.getElementById("btn_pagar");

    if (btnPagar) {
        btnPagar.addEventListener("click", () => {

            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            if (carrito.length === 0) {
                mostraralerta("El carrito está vacío", "error");
                return;
            }
            console.log("Pagado");
            mostraralerta("Pago realizado con éxito", "success");

            localStorage.removeItem("carrito");

            setTimeout(() => {
                window.location.href = "/HTML/es/catalogo.html";
            }, 2000);
        });
    }

});
//Detectar descuento
document.addEventListener("DOMContentLoaded", () => {
    const inputCodigo = document.getElementById("codigo_descuento");

    if (inputCodigo) {
        inputCodigo.addEventListener("input", actualizarResumen);
    }
});