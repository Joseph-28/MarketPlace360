document.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear();
    //Cambio de pestañas
    const tabs = document.querySelectorAll(".tab");
    const contenedor = document.querySelector(".contenedor_formularios");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("activo"));
            tab.classList.add("activo");

            const target = tab.dataset.target;

            if (target === "registro") {
                contenedor.classList.add("mostrar-registro");
            } else {
                contenedor.classList.remove("mostrar-registro");
            }
        });
    });

    //Mostrar contraseña
    const passwordIcons = document.querySelectorAll(".cambio_contrasena_icono");

    passwordIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const inputContrasena = this.previousElementSibling;

            if (inputContrasena.type === "password") {
                inputContrasena.type = "text";
                this.classList.add("activo");
            } else {
                inputContrasena.type = "password";
                this.classList.remove("activo");
            }
        });
    });
});

// Registro
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_registro").addEventListener("click", function (e) {
        e.preventDefault();
        try {
            const nombre = document.getElementById("registro_nombre").value;
            const cedula = document.getElementById("registro_cedula").value;
            const fecha = document.getElementById("registro_fecha").value;
            const direccion = document.getElementById("registro_direccion").value;
            const correo = document.getElementById("registro_correo").value;
            const confirmarCorreo = document.getElementById("registro_confirmar_correo").value;
            const password = document.getElementById("registro_contraseña").value;
            const confirmarPassword = document.getElementById("registro_confirmar_contraseña").value;
            const boletin = document.getElementById("boletin").checked;;

            // Validaciones básicas
            const nombreVal = nombre.trim();
            const cedulaVal = cedula.trim();
            const fechaVal = fecha.trim();
            const direccionVal = direccion.trim();
            const correoVal = correo.trim();
            const confirmarCorreoVal = confirmarCorreo.trim();
            const passwordVal = password.trim();
            const confirmarPasswordVal = confirmarPassword.trim();

            // Validar campos vacíos
            if (!nombreVal) {
                mostraralerta("¡El nombre es obligatorio!", "error");
                return;
            }
            if (!cedulaVal) {
                mostraralerta("¡La cédula es obligatoria!", "error");
                return;
            }
            if (!fechaVal) {
                mostraralerta("¡La fecha de nacimiento es obligatoria!", "error");
                return;
            }
            if (!direccionVal) {
                mostraralerta("¡La dirección es obligatoria!", "error");
                return;
            }
            if (!correoVal) {
                mostraralerta("¡El correo es obligatorio!", "error");
                return;
            }
            if (!confirmarCorreoVal) {
                mostraralerta("¡Confirme su correo electronico!", "error");
                return;
            }
            if (!passwordVal) {
                mostraralerta("¡La contraseña es obligatoria!", "error");
                return;
            }
            if (!confirmarPasswordVal) {
                mostraralerta("¡Confirme su contraseña!", "error");
                return;
            }

            if (correo !== confirmarCorreo) {
                mostraralerta("¡Los correos no coinciden!", "error");
                return;
            }

            if (password !== confirmarPassword) {
                mostraralerta("¡Las contraseñas no coinciden!", "error");
                return;
            }
            // Crear objeto usuario
            const usuario = {
                nombre: nombreVal,
                cedula: cedulaVal,
                fecha: fechaVal,
                direccion: direccionVal,
                correo: correoVal,
                password: passwordVal,
                boletin,
                preferencias: {
                    idioma: "Español",
                    ultimos4: "0000",
                    marca: "Sin agregar"
                }
            };
            // Obtener usuarios existentes
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            // Verificar si ya existe
            const existe = usuarios.some(u => u.correo === correo);

            if (existe) {
                mostraralerta("Este correo ya se encuentra registrado", "error");
                return;
            }
            // Guardar usuario
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            // Limpiar formulario
            document.getElementById("form_registro").querySelector("form").reset();

            mostraralerta("¡Usuario creado con exito!", "success");
            setTimeout(() => {
                window.location.href = "HTML/es/registro_login.html";
            }, 2000);
        } catch (error) {
            mostraralerta("¡No se ha podido crear el usuario!", "error");
        }
    });
});
// Login
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_inicio").addEventListener("click", function (e) {
        e.preventDefault();

        const correo = document.getElementById("login_correo").value;
        const password = document.getElementById("login_contraseña").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(u => u.correo === correo && u.password === password);
        if (!usuario) {
            mostraralerta("Correo o contraseña incorrectos", "error");
            return;
        }

        // Guardar sesion activa
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        mostraralerta("¡Inicio de sesión exitoso!", "success");
        setTimeout(() => {
            window.location.href = "HTML/es/index.html";
        }, 2000);
    });
});