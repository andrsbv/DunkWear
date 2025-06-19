"use strict";

import "./input.css";
import { fetchFakerData } from "./functions.js";
import { saveVote } from './js/firebase.js';
import { getVotes } from './js/firebasedb.js';


//Productos
const products = [
  {
    id: "basketball1",
    name: "Balón Molten FIBA",
    description: "Balón oficial FIBA, máxima calidad y agarre.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_hOjRKc5oyoVp5gL4raPndEVi0ToNCFekA&s"
  },
  {
    id: "short1",
    name: "Short Mesh Balenciaga",
    description: "Short clásico, fresco y cómodo para la cancha.",
    image: "https://media.lanecrawford.com/E/I/Y/EIY134_in_xl.jpg"
  },
  {
    id: "tshirt1",
    name: "Camiseta Basketball Clásica",
    description: "Camiseta de algodón, diseño icónico para jugadores.",
    image: "https://m.media-amazon.com/images/I/61OL7aojDiL.jpg"
  },
  {
    id: "tshirt2",
    name: "Player T-Shirt",
    description: "T-shirt gris con silueta de jugadores, ideal para fans.",
    image: "https://m.media-amazon.com/images/I/B1EWx17iUcL._CLa%7C2140%2C2000%7C71o1qqykEzL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png"
  },
  {
    id: "shoes1",
    name: "Basketball Shoes Pro",
    description: "Zapatillas de alto rendimiento, perfectas para cada jugada.",
    image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/0716dbc87213622223e884ea79fac5c6.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
  },
  {
    id: "shoes2",
    name: "Urban Basketball Shoes",
    description: "Diseño único y agarre superior para la cancha.",
    image: "https://m.media-amazon.com/images/I/81KC9hkRbLL._UY300_.jpg" // Puedes cambiar por otra si quieres algo más real
  }
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
function renderCards(products, votes = {}) {
  const container = document.getElementById("skeleton-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
    "flex flex-col items-center justify-between bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition border border-gray-200 dark:border-gray-800 p-6";


    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-36 h-36 object-cover rounded-xl mb-4 shadow-lg" />
      <h3 class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-1">${product.name}</h3>
      <p class="text-gray-600 dark:text-gray-300 text-center text-sm mb-3">${product.description}</p>
      <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 votar-btn mb-2"
        data-product="${product.id}">
        Votar
      </button>
      <span class="text-xs text-gray-500 dark:text-gray-400 text-center">Votos: <span class="font-semibold">${votes[product.id] || 0}</span></span>
    `;
    container.appendChild(card);
  });

  // Eventos de votación
  container.querySelectorAll(".votar-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-product");
      await saveVote(productId);
      renderVotes();
      showToast();
    });
  });
}

function renderResults(votes) {
  const resultsDiv = document.getElementById("results");
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) || 1;
  let html = '';

  products.forEach(prod => {
    const v = votes[prod.id] || 0;
    const percent = Math.round((v / totalVotes) * 100);
    html += `
      <div class="mb-4">
        <div class="flex justify-between items-center text-base font-semibold">
          <span class="text-black" style="color:#111!important">${prod.name}</span>
          <span class="text-orange-600 dark:text-orange-400">${v} voto${v !== 1 ? 's' : ''} (${percent}%)</span>
        </div>
        <div class="w-full h-3 rounded bg-gray-200 dark:bg-gray-700 mb-1 overflow-hidden">
          <div class="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded transition-all duration-300" style="width:${percent}%"></div>
        </div>
      </div>
    `;

  });

  resultsDiv.innerHTML = html || `<p class="text-gray-500 text-center mt-16">Aún no hay votos.</p>`;
}





// Mostrar resultados de votos
function renderVotes() {
  getVotes((votes) => {
    renderCards(products, votes);
    renderResults(votes);
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
  renderVotes();
})();

