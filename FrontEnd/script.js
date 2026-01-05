import { initModal } from './modal.js';
import { modifyHomePageForUserConnected } from './auth-ui.js';
import { getProjects, getCategories } from './api.js';
import { initModalForm } from './modal-form.js';

const token = window.localStorage.getItem("authToken"); // Récupération du token d'authentification depuis le localStorage

// Appel des fonctions au chargement de la page
async function init() {
    try {
        await getProjects(); // Appel de la fonction pour récupérer et afficher les projets

        await getCategories(token); // Appel de la fonction pour récupérer et afficher les boutons catégories

        modifyHomePageForUserConnected(token); // Appel de la fonction pour modifier la page d'accueil si l'utilisateur est logué

        initModal(); // Appel de la fonction pour gérer l'ouverture et la fermeture de la modal

        initModalForm(); 
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page avec init:", error);
    }
}

init(); // Initialisation de la page