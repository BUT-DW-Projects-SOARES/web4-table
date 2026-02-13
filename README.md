# web4-table

UE Web4 TP - Une table de données éditable

Projet Vite vanilla créé pour le TP WEB4 : création d'une table de données interactive avec gestion CRUD (Create, Read, Update, Delete) et manipulation du DOM en JavaScript.

## Objectifs

L'objectif de ce TP est de réviser :

- La récupération et le traitement de données JSON via l'API Fetch
- La création et la modification d'éléments du DOM
- La mise en place de gestionnaires d'événements
- L'organisation du code avec des modules ESM
- L'édition en ligne de contenu dans une table HTML

## Mise en place

### 1. Architecture du projet

- Projet Vite avec template Vanilla
- ESLint pour la vérification du code
- JSDoc pour la documentation

### 2. Contenu de `index.html`

- Titre `h1` : « Membres de l'organisation »
- Conteneur `div` avec `id="container"` pour les éléments générés

### 3. Récupération des données

Utilisation de l'API Fetch pour récupérer les utilisateurs via :

```
https://jsonplaceholder.typicode.com/users
```

### 4. Affichage des données

- Fonction affichant le nombre de membres dans un `<h2>`
- Fonction `createTable()` générant une table HTML avec colonnes : `id`, `name`, `email`, `company.name`
- Code modulaire avec séparation en sous-fonctions

### 5. Structure des modules

- Module `createTable.js` contenant la logique de création de table
- Importation du module dans `main.js`
- Documentation JSDoc du module

### 6. Génération de la documentation

```bash
jsdoc src/createTable.js
```

### 7. API Users locale

Utilisation de l'[API Users](https://git.unistra.fr/but2dw-web4/web4-api_users) pour les opérations CRUD (GET, POST, DELETE, PUT).

### 8. Fonctionnalités avancées

- **Suppression** : Bouton « X » sur chaque ligne pour supprimer un membre
- **Ajout** : Formulaire `createForm()` pour ajouter de nouveaux membres
- **Édition** : Édition en ligne au clic sur une cellule avec validation clavier (Entrée)

## Installation

```bash
pnpm install
```

## Développement

```bash
pnpm run dev
```

## Linting

```bash
pnpm run lint
```

## ESLint et JSDoc

Le projet inclut ESLint pour la validation du code et JSDoc pour la documentation des fonctions.
