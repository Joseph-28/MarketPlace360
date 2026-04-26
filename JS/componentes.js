
document.addEventListener("DOMContentLoaded", () => {
    //Cargar el header
    fetch("HTML/componentes/header.html")
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar header");
            return res.text();
        })
        .then(data => {
            document.getElementById("header").innerHTML = data;
            activarLogout();
            activarDetails();
            activarBuscador();
        })
        .catch(err => console.error(err));

    //Cargar el footer
    fetch("HTML/componentes/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
});

