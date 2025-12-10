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

    afficherCategories(categories); // Appel de la fonction pour afficher les catégories
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
        filtrerProjets(); // Appel de la fonction pour activer le filtrage des projets
    }
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

recupererProjets(); // Appel de la fonction pour récupérer et afficher les projets

recupererCategories(); // Appel de la fonction pour récupérer et afficher les boutons catégories