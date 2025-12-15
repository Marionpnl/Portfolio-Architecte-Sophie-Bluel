let projets = []; // Tableau pour stocker les projets récupérés
let categories = []; // Tableau pour stocker les catégories récupérées

// Appel de l'API pour récupérer les projets
async function recupererProjets() {
    const response = await fetch("http://localhost:5678/api/works")
    projets = await response.json(); //liste des projets

    console.log("Projets récupérés!", projets);
    
    afficherProjets(projets); // Appel de la fonction pour afficher les projets
}

// Création et insertion des éléments du DOM pour chaque projet
function afficherProjets(projets) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les projets filtrés

    for (let i=0; i < projets.length; i++) {
        const ficheProjet = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = projets[i].imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projets[i].title;

        ficheProjet.appendChild(imageProjet);
        ficheProjet.appendChild(titreProjet);
        gallery.appendChild(ficheProjet);

        console.log("Projet ajouté!", imageProjet, titreProjet);
    }
}


// Appel de l'API pour récupérer les catégories des filtres
async function recupererCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    categories = await response.json(); //liste des catégories

    console.log("Catégories récupérées!", categories);

    // Suppression des filtres
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = ""; 

    // Affichage des filtres seulement si l'utilisateur n'est pas logué
    if (!token) {
    afficherCategories(categories); // Appel de la fonction pour afficher les catégories
    }
}

// Création et insertion des boutons de filtre pour chaque catégorie
function afficherCategories(categories) {
    const filtersContainer = document.querySelector(".filters");
    // Bouton "Tous"
    const buttonTous = document.createElement("button");
    buttonTous.innerText = "Tous";
    filtersContainer.appendChild(buttonTous);

    // Boutons des catégories
    for (let i=0; i < categories.length; i++) {
        const buttonsFilter = document.createElement("button");
        buttonsFilter.innerText = categories[i].name;
        buttonsFilter.value = categories[i].id;
        filtersContainer.appendChild(buttonsFilter);

        console.log("Bouton de filtre ajouté!", buttonsFilter);
    }
    filtrerProjets(); // Appel de la fonction pour activer le filtrage des projets
}

// Ajout de la fonctionnalité de filtre aux boutons
function filtrerProjets() {
    const buttons = document.querySelectorAll(".filters button")
    console.log("Boutons trouvés :", buttons);
    // Ajout d'event listener aux boutons
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.innerText === "Tous") {
                afficherProjets(projets);
            } else {
            const filtersProjets = projets.filter (projet => projet.categoryId == button.value);
            afficherProjets(filtersProjets);
            }
        })
    })
}

function modifierHomePagePourUtilisateurLogue() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
    // L'utilisateur est "logué"
        // Modification du bouton "login" en "logout"
        document.querySelector(".login").textContent = "logout";

        // Ajout de la bannière 
        const banner = document.createElement("div");
        banner.classList.add("edit-banner");
        banner.innerHTML = `
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Mode édition</p>
            `;
        const header = document.querySelector("header");
        header.before(banner);

        // Ajout du bouton "modifier" 
        const modifyButton = document.createElement("button");
        modifyButton.classList.add("modify-button");
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

        deconnecterUtilisateur(); // Appel de la fonction pour gérer la déconnexion
    } else {
        // L'utilisateur est "visiteur"
    }
}

function deconnecterUtilisateur() {
    const loginElement = document.querySelector(".login");
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("authToken");
        window.location.href = "index.html";
    })
}       

recupererProjets(); // Appel de la fonction pour récupérer et afficher les projets

recupererCategories(); // Appel de la fonction pour récupérer et afficher les boutons catégories

modifierHomePagePourUtilisateurLogue(); // Appel de la fonction pour modifier la page d'accueil si l'utilisateur est logué