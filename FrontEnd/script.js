import { initModal } from './modal.js';

let projects = []; // Tableau pour stocker les projets récupérés
let categories = []; // Tableau pour stocker les catégories récupérées

const token = window.localStorage.getItem("authToken"); // Récupération du token d'authentification depuis le localStorage

// Appel de l'API pour récupérer les projets
async function getProjects() {
    const response = await fetch("http://localhost:5678/api/works")
    projects = await response.json(); //liste des projets

    console.log("Projets récupérés!", projects);
    
    showProjects(projects); // Appel de la fonction pour afficher les projets
}

// Création et insertion des éléments du DOM pour chaque projet
function showProjects(projets) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les projets filtrés

    for (let i=0; i < projets.length; i++) {
        const projectSheet = document.createElement("figure");
        const projectImage = document.createElement("img");
        projectImage.src = projets[i].imageUrl;
        const projectTitle = document.createElement("figcaption");
        projectTitle.innerText = projets[i].title;

        projectSheet.appendChild(projectImage);
        projectSheet.appendChild(projectTitle);
        gallery.appendChild(projectSheet);

        console.log("Projet ajouté!", projectImage, projectTitle);
    }
}

// Appel de l'API pour récupérer les catégories des filtres
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    categories = await response.json(); //liste des catégories

    console.log("Catégories récupérées!", categories);

    // Suppression des filtres
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = ""; 

    // Affichage des filtres seulement si l'utilisateur n'est pas logué
    if (!token) {
    showCategories(categories); // Appel de la fonction pour afficher les catégories
    }
}

// Création et insertion des boutons de filtre pour chaque catégorie
function showCategories(categories) {
    const filtersContainer = document.querySelector(".filters");
    // Bouton "Tous"
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    filtersContainer.appendChild(allButton);

    // Boutons des catégories
    for (let i=0; i < categories.length; i++) {
        const filtersButtons = document.createElement("button");
        filtersButtons.innerText = categories[i].name;
        filtersButtons.value = categories[i].id;
        filtersContainer.appendChild(filtersButtons);

        console.log("Bouton de filtre ajouté!", filtersButtons);
    }
    filterProjects(); // Appel de la fonction pour activer le filtrage des projets
}

// Ajout de la fonctionnalité de filtre aux boutons
function filterProjects() {
    const buttons = document.querySelectorAll(".filters button")
    console.log("Boutons trouvés :", buttons);
    // Ajout d'event listener aux boutons
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.innerText === "Tous") {
                showProjects(projects);
            } else {
            const filtersProjets = projects.filter (projet => projet.categoryId == button.value);
            showProjects(filtersProjets);
            }
        })
    })
}

// Modification de la page d'accueil si l'utilisateur est logué
function modifyHomePageForUserConnected() {
    if (token) {
    // Si l'utilisateur est "logué"
        // Modification du bouton "login" en "logout"
        document.querySelector(".login").textContent = "logout";

        // Ajout de la bannière 
        addEditBanner();

        // Ajout du bouton "modifier" dans une div avec le h2 existant
        addModifyButton();

        disconnectUser(); // Appel de la fonction pour gérer la déconnexion
    } else {
        // L'utilisateur est "visiteur"
    }
}

// Ajout de la bannière "Mode édition" en haut de la page
function addEditBanner() {
    const banner = document.createElement("div");
        banner.classList.add("edit-banner");
        banner.innerHTML = `
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Mode édition</p>
            `;
        const header = document.querySelector("header");
        header.before(banner);
}

// Ajout du bouton "modifier" dans la section portfolio
function addModifyButton() {
    const modifyButton = document.createElement("button");
    modifyButton.classList.add("modal-button");
    modifyButton.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <p>modifier</p>
        `;
    const portfolioHeader = document.createElement("div");
    portfolioHeader.classList.add("header-portfolio");
   
    const portfolioTitle = document.querySelector("#portfolio h2");
    portfolioHeader.append(portfolioTitle, modifyButton);

    const portfolioSection = document.getElementById("portfolio");
    portfolioSection.prepend(portfolioHeader);
}

// Gestion de la déconnexion de l'utilisateur
function disconnectUser() {
    const loginElement = document.querySelector(".login");
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("authToken");
        window.location.href = "index.html";
    })
}       

// Appel des fonctions au chargement de la page

getProjects(); // Appel de la fonction pour récupérer et afficher les projets

getCategories(); // Appel de la fonction pour récupérer et afficher les boutons catégories

modifyHomePageForUserConnected(); // Appel de la fonction pour modifier la page d'accueil si l'utilisateur est logué

initModal(); // Appel de la fonction pour gérer l'ouverture et la fermeture de la modal
