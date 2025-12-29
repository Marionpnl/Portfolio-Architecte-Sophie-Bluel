// Création et insertion des éléments du DOM pour chaque projet
function showProjects(projects) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les projets filtrés

    for (let i=0; i < projects.length; i++) {
        const projectSheet = document.createElement("figure");
        const projectImage = document.createElement("img");
        projectImage.src = projects[i].imageUrl;
        projectImage.alt = projects[i].title;
        const projectTitle = document.createElement("figcaption");
        projectTitle.innerText = projects[i].title;

        projectSheet.appendChild(projectImage);
        projectSheet.appendChild(projectTitle);
        gallery.appendChild(projectSheet);

        console.log("Projet ajouté!", projectImage, projectTitle);
    }
}

// Création et insertion des boutons de filtre pour chaque catégorie
function showCategories(categories, projects) {
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
    filterProjects(projects); // Appel de la fonction pour activer le filtrage des projets
}

// Ajout de la fonctionnalité de filtre aux boutons
function filterProjects(projects) {
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


// Gestion de l'affichage des travaux de la gallerie dans la modale
function showProjectsInModal(projects) {
    const photosContainer = document.querySelector(".gallery-view .photos");
    photosContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les projets

    for (let i = 0; i < projects.length; i++) {
        const imageSheet = document.createElement("figure");

        const imageProject = document.createElement("img");
        imageProject.src = projects[i].imageUrl;
        imageProject.alt = projects[i].title;
        imageProject.dataset.id = projects[i].id;

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        trashIcon.dataset.id = projects[i].id;

        imageSheet.appendChild(imageProject);
        imageSheet.appendChild(trashIcon);
        photosContainer.appendChild(imageSheet);

        console.log("Projet ajouté dans la modale!", imageProject);
    }
}

export { showProjects, showCategories, showProjectsInModal };