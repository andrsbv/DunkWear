"use strict";

import "./input.css";
import { fetchFakerData } from "./functions.js";
import { saveVote } from './js/firebase.js';
import { getVotes } from './js/firebasedb.js';


//Productos
const products = [
  {
    id: 'product1',
    name: 'Camiseta Dunk Pro',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    description: 'Camiseta deportiva oficial, máxima frescura y comodidad para la cancha.',
  },
  {
    id: 'product2',
    name: 'Short Urban Court',
    image: 'https://images.unsplash.com/photo-1519864600265-abb237754010?auto=format&fit=crop&w=400&q=80',
    description: 'Short resistente y ligero, ideal para tus mejores jugadas.',
  },
  {
    id: 'product3',
    name: 'Gorra Snapback',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    description: 'Gorra con estilo urbano, para jugadores con actitud.',
  },
  {
    id: 'product4',
    name: 'Balón Pro Training',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Balón oficial de entrenamiento, aprobado por la LDP.',
  },
  {
    id: 'product5',
    name: 'Mochila DunkWear',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Mochila con compartimientos premium, lleva tu juego a todas partes.',
  },
  {
    id: 'product6',
    name: 'Medias Court Pro',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Medias deportivas antideslizantes, máximo rendimiento.',
  },
  {
    id: 'product7',
    name: 'Sudadera Classic',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    description: 'Sudadera para entrenar o para la calle. Look clásico, comodidad total.',
  },
  {
    id: 'product8',
    name: 'Muñequeras Flex',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Muñequeras absorbentes, protege tu juego.',
  },
];


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
  if (toast) {
    toast.classList.add("hidden");
  }
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

// Cargar datos desde la API externa
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

// Mostrar resultados de votos
function renderVotes() {
  getVotes((data) => {
    const resultsDiv = document.getElementById("results");
    
    // data ya viene agrupado desde getVotes, no necesitas volver a agrupar
    resultsDiv.innerHTML = `
      <p class="text-gray-500 text-center mt-4 font-semibold">Resultado de la votación:</p>
      <ul class="text-center mt-2">
        ${Object.entries(data)
          .map(([product, count]) => `<li>${product}: ${count} votos</li>`)
          .join("")}
      </ul>
    `;
  });
}



// Habilitar el formulario de votación
function enableForm() {
  const form = document.getElementById("form_voting");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const select = document.getElementById("select_product");
  const selectedProduct = select.value;

  if (selectedProduct) {
    saveVote(selectedProduct)
      .then(() => {
        console.log('✅ Voto guardado correctamente');
        // Aquí puedes mostrar tu mensaje de éxito
        alert('¡Voto guardado exitosamente!'); // o usar tu toast
        form.reset();
        renderVotes();
      })
      .catch((error) => {
        console.error('❌ Error al guardar el voto:', error);
        // Aquí puedes mostrar tu mensaje de error
        alert('Error al guardar el voto: ' + error.message);
      });
  }
});

}

// Autoejecución al cargar
(() => {
  showToast();
  const cerrar = document.getElementById("cerrar-toast");
  if (cerrar) cerrar.addEventListener("click", hideToast);
  loadData();
  enableForm();
  renderVotes();
})();
