import '../style.css';

/**
 * @module createTable
 */

// ------------------- Génération HTML de la table -------------------

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
      <td class="editable" onclick="editForm(${member.id})">${member.id}</td>
      <td class="editable" onclick="editForm(${member.id})">${member.name}</td>
      <td class="editable" onclick="editForm(${member.id})">${member.email}</td>
      <td class="editable" onclick="editForm(${member.id})">${member.company.name}</td>
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

// ------------------- Affichage et gestion de la table -------------------

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

    // Ajoute le bouton "Ajouter un membre" en bas du tableau
    const addButton =
      '<button onclick="createForm()" class="add-member-btn">Ajouter un membre</button>';
    container.insertAdjacentHTML('beforeend', addButton);
  } catch (error) {
    window.alert(error.message);
  }
}

/**
 * Supprime un membre via l'API
 * @async
 * @param {number} id - L'identifiant du membre à supprimer
 * @returns {Promise<void>}
 */
async function deleteMember(id) {
  const url = `http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=delete&user=${id}`;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    window.alert(`Membre avec ID ${id} supprimé`);
    window.location.reload();
    console.log(json);
  } catch (error) {
    window.alert(error.message);
  }
}

// ------------------- Formulaires (ajout & édition) -------------------

/**
 * Crée et affiche un formulaire pour ajouter un nouveau membre
 * @returns {void}
 */
function createForm() {
  const formHTML = `
    <form id="memberForm">
      <h3>Ajouter un nouveau membre</h3>
      <label for="name">Name :</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email :</label>
      <input type="email" id="email" name="email" required>
      <label for="companyName">Company :</label>
      <input type="text" id="companyName" name="companyName" required>
      <button type="submit">Ajouter</button>
      <button type="button" id="cancelBtn">Annuler</button>
    </form>
  `;
  const container = document.getElementById('container');
  container.insertAdjacentHTML('beforeend', formHTML);
  document
    .getElementById('memberForm')
    .addEventListener('submit', handleFormSubmit);
  document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('memberForm').remove();
  });
}

/**
 * Gère la soumission du formulaire d'ajout d'un membre
 * @async
 * @param {Event} event - L'événement de soumission
 * @returns {Promise<void>}
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const readAllUrl =
      'http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=readall';
    const usersResponse = await fetch(readAllUrl);
    const users = await usersResponse.json();
    let maxId = 0;
    users.forEach((user) => {
      if (user.id && user.id > maxId) {
        maxId = user.id;
      }
    });
    const formData = {
      id: maxId + 1,
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      company: {
        name: document.getElementById('companyName').value,
      },
    };
    const url =
      'http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=create';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log('Membre créé:', json);
    window.alert('Membre ajouté avec succès !');
    window.location.reload();
  } catch (error) {
    console.error(error.message);
    window.alert(`Erreur lors de l'ajout: ${error.message}`);
  }
}

/**
 * Crée et affiche un formulaire pour éditer un membre existant
 * @async
 * @param {number} id - L'identifiant du membre à éditer
 * @returns {Promise<void>}
 */
async function editForm(id) {
  const existingForm = document.getElementById('editMemberForm');
  if (existingForm) {
    existingForm.remove();
  }
  const url = `http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=read&user=${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const member = await response.json();
    const formHTML = `
      <form id="editMemberForm">
        <h3>Éditer le membre</h3>
        <label for="editName">Name :</label>
        <input type="text" id="editName" name="editName" value="${member.name}" required>
        <label for="editEmail">Email :</label>
        <input type="email" id="editEmail" name="editEmail" value="${member.email}" required>
        <label for="editCompanyName">Company :</label>
        <input type="text" id="editCompanyName" name="editCompanyName" value="${member.company.name}" required>
        <button type="submit">Enregistrer</button>
        <button type="button" id="cancelEditBtn">Annuler</button>
      </form>
    `;
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', formHTML);
    document
      .getElementById('editMemberForm')
      .addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
          const updatedData = {
            id: member.id,
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            company: {
              name: document.getElementById('editCompanyName').value,
            },
          };
          const updateUrl = `http://localhost/S4/Web4/TP4/web4-api_users/users.php?function=update&user=${id}`;
          const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          });
          if (!updateResponse.ok) {
            throw new Error(`Response status: ${updateResponse.status}`);
          }
          const json = await updateResponse.json();
          console.log('Membre mis à jour:', json);
          window.alert('Membre mis à jour avec succès !');
          window.location.reload();
        } catch (error) {
          console.error(error.message);
          window.alert(`Erreur lors de la mise à jour: ${error.message}`);
        }
      });
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
      document.getElementById('editMemberForm').remove();
    });
  } catch (error) {
    console.error(error.message);
    window.alert(`Erreur lors de la récupération du membre: ${error.message}`);
  }
}

// ------------------- Exports & global -------------------

window.deleteMember = deleteMember;
window.createForm = createForm;
window.editForm = editForm;

export { createTable, displayTable, deleteMember, createForm, editForm };
