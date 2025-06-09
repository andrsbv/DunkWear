"use strict";
import "./input.css";
import { fetchFakerData } from "./functions.js";

// Mostrar toast si está presente
function showToast() {
  const toast = document.getElementById("toast-interactive");
  if (toast) {
    toast.classList.remove("hidden");
    toast.classList.add("md:block");
  }
}

// Ocultar toast al hacer clic
function hideToast() {
  const toast = document.getElementById("toast-interactive");
  toast.classList.add("hidden");
}

// Renderizar tarjetas con datos
function renderCards(data) {
  const container = document.getElementById("skeleton-container");
  container.innerHTML = "";

  data.slice(0, 3).forEach((item) => {
    const card = document.createElement("div");
    card.className = "p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition";
    card.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">${item.title}</h3>
      <p class="text-gray-600 dark:text-gray-300">${item.content}</p>
    `;

    container.appendChild(card);
  });
}

// Obtener datos de la API
const loadData = async () => {
  const url = "https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120";
  try {
    const result = await fetchFakerData(url);
    if (result.success) {
      renderCards(result.body.data);
    } else {
      console.error("Error:", result.error);
    }
  } catch (err) {
    console.error("Error inesperado:", err);
  }
};

// Autoejecución
(() => {
  showToast();
  const cerrar = document.getElementById("cerrar-toast");
  if (cerrar) cerrar.addEventListener("click", hideToast);
  loadData();
})();
