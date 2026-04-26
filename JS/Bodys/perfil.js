//Cargar datos
document.addEventListener("DOMContentLoaded", function () {
    console.log(localStorage);
    const usuario = obtenerUsuarioActivo();

    // Si no hay sesión
    if (!usuario) {
        mostraralerta("Debe iniciar sesión para cargar los datos", "error");
        setTimeout(() => {
            window.location.href = "HTML/es/registro_login.html";
        }, 2000);
        return;
    }

    // Insertar datos en el HTML
    document.getElementById("perfil_nombre_saludo").textContent = usuario.nombre;
    document.getElementById("perfil_nombre").textContent = usuario.nombre;
    document.getElementById("perfil_fecha").textContent = usuario.fecha;
    document.getElementById("perfil_correo").textContent = usuario.correo;
    document.getElementById("perfil_cedula").textContent = usuario.cedula;
    document.getElementById("perfil_direccion").textContent = usuario.direccion;

    document.getElementById("perfil_idioma").textContent = usuario.preferencias.idioma;
    document.getElementById("perfil_tarjeta").textContent = usuario.preferencias.marca + " Últimos 4 digitos [*" + usuario.preferencias.ultimos4 + "]";
});
//Editar datos
document.addEventListener("DOMContentLoaded", () => {
    const modalEditar = document.getElementById("modal_editar");
    const modalPreferencias = document.getElementById("modal_preferencias");

    // Abrir modales
    
    //Editar Perfil
    const btnAbrirEditar = document.getElementById("btn_editar"); 
    if (btnAbrirEditar) {
        btnAbrirEditar.addEventListener("click", (e) => {
            e.preventDefault();
            const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));
            if (!usuario) return;

            // Pre-cargar datos en el formulario
            document.getElementById("edit_nombre").value = usuario.nombre || "";
            document.getElementById("edit_cedula").value = usuario.cedula || "";
            document.getElementById("edit_correo").value = usuario.correo || "";
            document.getElementById("edit_fecha").value = usuario.fechaNacimiento || "";
            document.getElementById("edit_direccion").value = usuario.direccion || "";
            document.getElementById("edit_boletin").checked = usuario.boletin || false;

            modalEditar.classList.add("activo");
        });
    }

    //Preferencias
    const btnAbrirPreferencias = document.getElementById("btn_preferencias"); 
    if (btnAbrirPreferencias) {
        btnAbrirPreferencias.addEventListener("click", (e) => {
            e.preventDefault();
            const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));
            if (usuario) {
                document.getElementById("edit_idioma").value = usuario.idioma || "es";
            }
            modalPreferencias.classList.add("activo");
        });
    }
    // Guardar perfil
    const formEditar = document.getElementById("form_editar");
    formEditar.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreVal = document.getElementById("edit_nombre").value.trim();
        const cedulaVal = document.getElementById("edit_cedula").value.trim();
        const correoVal = document.getElementById("edit_correo").value.trim();
        const fechaVal = document.getElementById("edit_fecha").value;
        const direccionVal = document.getElementById("edit_direccion").value.trim();
        const boletin = document.getElementById("edit_boletin").checked;

        if (!nombreVal || !cedulaVal || !fechaVal || !direccionVal || !correoVal) {
            mostraralerta("Todos los campos son obligatorios", "error");
            return;
        }

        actualizarUsuario({
            nombre: nombreVal,
            cedula: cedulaVal,
            correo: correoVal,
            fechaNacimiento: fechaVal,
            direccion: direccionVal,
            boletin: boletin
        });

        modalEditar.classList.remove("activo");
    });

    // Guardar preferencias
    const formPreferencias = document.getElementById("form_preferencias");
    formPreferencias.addEventListener("submit", (e) => {
        e.preventDefault();

        const numeroTarjeta = document.getElementById("tarjeta_numero").value.trim();
        const idiomaSel = document.getElementById("edit_idioma").value;

        if (numeroTarjeta.length != 16) {
            mostraralerta("Tarjeta inválida", "error");
            return;
        }

        const ultimos4 = numeroTarjeta.slice(-4);
        let marca = "Desconocida";
        if (numeroTarjeta.startsWith("4")) marca = "Visa";
        else if (numeroTarjeta.startsWith("5")) marca = "MasterCard";

        actualizarUsuario({
            preferencias: {
                idioma: idiomaSel,
                ultimos4: ultimos4,
                marca: marca
            }
        });

        modalPreferencias.classList.remove("activo");
    });

    // Funcion de actualizar
    function actualizarUsuario(nuevosDatos) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

        if (!usuarioActivo) return;

        const index = usuarios.findIndex(u => u.correo === usuarioActivo.correo);
        if (index !== -1) {
            // El spread operator (...) fusiona las claves.
            usuarios[index] = { ...usuarios[index], ...nuevosDatos };

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));
            
            if (typeof mostraralerta === "function") {
                mostraralerta("Cambios guardados con éxito", "success");
            }
            setTimeout(() => location.reload(), 1000);
        }
    }

    // Cerrar modales
    document.querySelectorAll(".modal").forEach(m => {
        m.addEventListener("click", (e) => {
            if (e.target.classList.contains("cerrar") || e.target === m) {
                m.classList.remove("activo");
            }
        });
    });
});
