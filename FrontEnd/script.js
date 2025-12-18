import { initModal } from './modal.js';
import { modifyHomePageForUserConnected } from './auth-ui.js';
import { getProjects, getCategories } from './api.js';

const token = window.localStorage.getItem("authToken"); // Récupération du token d'authentification depuis le localStorage

// Appel des fonctions au chargement de la page
async function init() {
    await getProjects(); // Appel de la fonction pour récupérer et afficher les projets

    await getCategories(token); // Appel de la fonction pour récupérer et afficher les boutons catégories

    modifyHomePageForUserConnected(token); // Appel de la fonction pour modifier la page d'accueil si l'utilisateur est logué

    initModal(); // Appel de la fonction pour gérer l'ouverture et la fermeture de la modal
}

init(); // Initialisation de la page