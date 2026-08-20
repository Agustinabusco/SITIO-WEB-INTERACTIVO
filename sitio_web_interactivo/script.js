const botones = document.querySelectorAll(".nav-btn");
const contenedor = document.getElementById("contenido");

async function cargarContenido(archivo, botonSeleccionado) {
    try {
        contenedor.innerHTML = '<p class="cargando">Cargando contenido...</p>';

        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo.");
        }

        const contenido = await respuesta.text();
        contenedor.innerHTML = contenido;

        botones.forEach(boton => boton.classList.remove("active"));
        botonSeleccionado.classList.add("active");

    } catch (error) {
        contenedor.innerHTML = `
            <p class="error">
                No se pudo cargar el contenido. Abre el proyecto utilizando
                Live Server desde Visual Studio Code.
            </p>
        `;
        console.error(error);
    }
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        cargarContenido(boton.dataset.page, boton);
    });
});

cargarContenido("blog.html", document.querySelector('[data-page="blog.html"]'));
