import './style.css';

function displayMemberCount(users) {
  const h2 = document.createElement('h2');
  h2.textContent = `Nombre de membres : ${users.length}`;
  return h2;
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const h2Element = displayMemberCount(users);
    document.getElementById('container').appendChild(h2Element);
  })
  .catch(error => console.error('Erreur:', error));
