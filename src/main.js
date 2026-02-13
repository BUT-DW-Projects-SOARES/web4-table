import './style.css';
import { displayTable } from './createTable.js';

async function getData() {
  // URL du point de terminaison de l'API REST
  const url =
    'http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=readall';
  try {
    // Appelle fetch
    const response = await fetch(url);
    // Vérifie le code de statut HTTP de la réponse
    if (!response.ok) {
      // Lève une erreur si response.ok vaut false
      throw new Error(`Response status: ${response.status}`);
    }

    // Convertit les données reçues en format JSON
    const json = await response.json();
    // Affiche les données dans la console
    console.log(json);

    // Affiche le nombre de membres sur la page
    const h2 = document.createElement('h2');
    h2.textContent = `Nombre de membres : ${json.length}`;
    const container = document.getElementById('container');
    container.appendChild(h2);
  } catch (error) {
    // Erreur : Affiche le message d'erreur
    console.error(error.message);
  }
}

await getData();
await displayTable();
