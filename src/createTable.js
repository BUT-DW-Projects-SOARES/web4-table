import './style.css';

/**
 * Crée l'en-tête HTML d'une table
 * @returns {string} Le code HTML de l'en-tête de la table
 */
function createTableHeader() {
  return `
    <thead>
      <tr>
        <th>Action</th>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Company</th>
      </tr>
    </thead>
  `;
}

/**
 * Crée une ligne HTML de table à partir des données d'un membre
 * @param {Object} member - Un objet membre contenant id, name, email et company
 * @param {number} member.id - L'identifiant du membre
 * @param {string} member.name - Le nom du membre
 * @param {string} member.email - L'email du membre
 * @param {Object} member.company - La compagnie du membre
 * @param {string} member.company.name - Le nom de la compagnie
 * @returns {string} Le code HTML d'une ligne de table
 */
function createTableRow(member) {
  return `
    <tr>
      <td><button onclick="deleteMember(${member.id})">X</button></td>
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.company.name}</td>
    </tr>
  `;
}

/**
 * Crée le corps HTML d'une table à partir d'un tableau de membres
 * @param {Array<Object>} data - Tableau d'objets membres
 * @returns {string} Le code HTML du corps de la table
 */
function createTableBody(data) {
  const rows = data.map(createTableRow).join('');
  return `<tbody>${rows}</tbody>`;
}

/**
 * Génère le code HTML complet d'une table à partir d'un tableau de données
 * @param {Array<Object>} data - Tableau d'objets membres
 * @returns {string} Le code HTML complet de la table
 */
function createTable(data) {
  const header = createTableHeader();
  const body = createTableBody(data);
  return `<table>${header}${body}</table>`;
}

/**
 * Récupère les données depuis l'API et affiche la table dans le DOM
 * @async
 * @returns {Promise<void>}
 */
async function displayTable() {
  const url =
    'http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=readall';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    // Génère le HTML de la table en appelant createTable
    const tableHTML = createTable(json);

    // Insère la table dans le DOM
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', tableHTML);
  } catch (error) {
    window.alert(error.message);
  }
}

/**
 * Supprime un membre via l'API
 * @param {number} id - L'identifiant du membre à supprimer
 * @async
 * @returns {Promise<void>}
 */

async function deleteMember(id) {
  // URL du point de terminaison de l'API REST
  const url = `http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=delete&user=${id}`;
  try {
    // Appelle fetch
    const response = await fetch(url, { method: 'DELETE' });
    // Vérifie le code de statut HTTP de la réponse
    if (!response.ok) {
      // Lève une erreur si response.ok vaut false
      throw new Error(`Response status: ${response.status}`);
    }

    // Convertit les données reçues en format JSON
    const json = await response.json();
    // Affiche les données dans la console
    window.alert(`Membre avec ID ${id} supprimé`);
    console.log(json);
  } catch (error) {
    // Erreur : Affiche le message d'erreur
    window.alert(error.message);
  }
}

// Expose la fonction globalement pour qu'elle soit accessible depuis onclick
window.deleteMember = deleteMember;

export { createTable, displayTable, deleteMember };
