import { ref, set, get, child } from "firebase/database";
import { database } from "./firebase.js";

// Obtener todos los votos
export function getVotes(callback) {
  const votesRef = ref(database, 'votes');

  get(votesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const rawVotes = snapshot.val();
      const groupedVotes = {};

      // Recorremos cada voto
      Object.values(rawVotes).forEach((vote) => {
        const product = vote.product;

        if (groupedVotes[product]) {
          groupedVotes[product]++;
        } else {
          groupedVotes[product] = 1;
        }
      });

      callback(groupedVotes);
    } else {
      callback({});
    }
  }).catch((error) => {
    console.error("❌ Error al obtener los votos:", error);
    callback({});
  });
}

