// Generar vendedores dinámicamente a partir de productosData
function obtenerVendedores(productos) {
    const vendedoresMap = {};

    productos.forEach(prod => {
        const nombre = prod.tienda;

        if (!vendedoresMap[nombre]) {
            vendedoresMap[nombre] = {
                nombre: nombre,
                categorias: [],
                totalValoracion: 0,
                cantidadProductos: 0,
                imagen: obtenerImagenVendedor(nombre)
            };
        }

        // Guardar categorías
        if (!vendedoresMap[nombre].categorias.includes(prod.categoria)) {
            vendedoresMap[nombre].categorias.push(prod.categoria);
        }

        // Sumar valoraciones
        vendedoresMap[nombre].totalValoracion += prod.valoracion;
        vendedoresMap[nombre].cantidadProductos++;
    });

    // Convertir a array final
    return Object.values(vendedoresMap).map(v => ({
        nombre: v.nombre,
        categoria: v.categorias[0], 
        calificacion: (v.totalValoracion / v.cantidadProductos).toFixed(1),
        imagen: v.imagen
    }));
}


// Imágenes por vendedor
function obtenerImagenVendedor(nombre) {
    const imagenes = {
        // Imagágen personalizada
        "Moda CR": "/img/image-solid.png",
        "Deportes CR": "/img/image-solid.png",
        "Zapatos CR": "/img/image-solid.png",
        "Belleza CR": "/img/image-solid.png",
        "Salud CR": "/img/image-solid.png",
        "Hogar CR": "/img/image-solid.png",
        "Tech CR": "/img/image-solid.png",
        "Niños CR": "/img/image-solid.png"
    };
    // Retornar default si no existe
    return imagenes[nombre] || "/img/image-solid.png";
}

// Export
const vendedoresData = obtenerVendedores(productosData);