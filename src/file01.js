"use strict";

/**
 * Muestra una notificación tipo "toast" después de un retraso de 2 segundos.
 * Verifica si el elemento con ID "toast-interactive" existe y le agrega la clase "md:block".
 *
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");

    if (toast) {
        setTimeout(() => {
            toast.classList.add("md:block");
        }, 2000);
    }
};

/**
 * Asigna un evento de clic al elemento con ID "demo".
 * Al hacer clic, se abre un video de YouTube en una nueva pestaña.
 *
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");

    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(() => {
    alert("¡Bienvenido a la página!");
    showToast();
    showVideo();
})();
// Exportar las funciones para que puedan ser utilizadas en otros módulos
export { showToast, showVideo };    