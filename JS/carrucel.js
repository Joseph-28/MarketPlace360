function inicializarCarruseles() {

    const carruceles = document.querySelectorAll(".carrucel");

    carruceles.forEach((carrucel) => {

        const contenedor = carrucel.querySelector(".carrucel_contenedor");
        const track = carrucel.querySelector(".carrucel_track");
        const timerBar = carrucel.querySelector(".timer_bar");
        const dotsContainer = carrucel.querySelector(".carrucel_dots");

        if (!contenedor || !track) return;

        const itemsOriginales = Array.from(track.children);
        const totalItems = itemsOriginales.length;

        if (totalItems === 0) return;

        dotsContainer.innerHTML = "";

        const itemWidth = itemsOriginales[0].offsetWidth + 20;

        //Crear dots
        itemsOriginales.forEach((_, index) => {
            const dot = document.createElement("section");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                const targetScroll = itemWidth * (totalItems + index);
                contenedor.scrollTo({ left: targetScroll, behavior: "smooth" });
                resetTimer();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = carrucel.querySelectorAll(".dot");

        //Clonacion infinita
        itemsOriginales.forEach(item => {
            track.appendChild(item.cloneNode(true));
            track.insertBefore(item.cloneNode(true), track.firstChild);
        });
        contenedor.scrollLeft = itemWidth * totalItems;

        // Timer
        let startTime;
        let requestId;
        const duration = 10000;

        const animateTimer = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const percentage = Math.min((progress / duration) * 100, 100);

            if (timerBar) timerBar.style.width = `${percentage}%`;

            if (progress < duration) {
                requestId = requestAnimationFrame(animateTimer);
            } else {
                contenedor.scrollLeft += itemWidth;
                resetTimer();
            }
        };

        const resetTimer = () => {
            cancelAnimationFrame(requestId);
            startTime = null;
            if (timerBar) timerBar.style.width = "0%";
            requestId = requestAnimationFrame(animateTimer);
        };

        // Scroll infinito + dots
        contenedor.addEventListener("scroll", () => {

            const scrollRelativo = contenedor.scrollLeft - (itemWidth * totalItems);

            let index = Math.round(scrollRelativo / itemWidth) % totalItems;

            if (index < 0) index = totalItems + index;

            dots.forEach(d => d.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");

            const maxScroll = track.scrollWidth - contenedor.offsetWidth;

            if (contenedor.scrollLeft <= 0) {
                contenedor.scrollLeft = itemWidth * totalItems;
            } else if (contenedor.scrollLeft >= maxScroll - 1) {
                contenedor.scrollLeft = itemWidth * totalItems;
            }
        });

        //Hover pause
        contenedor.addEventListener("mouseenter", () => cancelAnimationFrame(requestId));
        contenedor.addEventListener("mouseleave", () => {
            startTime = null;
            requestId = requestAnimationFrame(animateTimer);
        });

        //Iniciar
        requestId = requestAnimationFrame(animateTimer);
    });
}