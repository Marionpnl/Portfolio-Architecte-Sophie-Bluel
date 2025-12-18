// Création et insertion des éléments du DOM pour chaque projet
function showProjects(projects) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les projets filtrés

    for (let i=0; i < projects.length; i++) {
        const projectSheet = document.createElement("figure");
        const projectImage = document.createElement("img");
        projectImage.src = projects[i].imageUrl;
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

export { showProjects, showCategories };