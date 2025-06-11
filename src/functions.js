"use strict";

/**
 * Obtiene datos de texto desde Faker API
 * @param {string} url - URL del servicio externo
 * @returns {Promise<{success: boolean, body?: any, error?: string}>}
 */
export const fetchFakerData = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    .then((data) => ({
      success: true,
      body: data
    }))
    .catch((error) => ({
      success: false,
      error: `Error en la petición: ${error.message}`
    }));
};
