// Appel de l'API pour récupérer les projets
async function recupererProjets() {
    const response = await fetch("http://localhost:5678/api/works")
    const projets = await response.json();
    console.log("Projets récupérés!", projets);
    // Création et insertion des éléments du DOM pour chaque projet
     for (let i=0; i < projets.length; i++) {
        const ficheProjet = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = projets[i].imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projets[i].title;

        ficheProjet.appendChild(imageProjet);
        ficheProjet.appendChild(titreProjet);
        document.querySelector(".gallery").appendChild(ficheProjet);

        console.log("Projet ajouté!", imageProjet, titreProjet);
    }
}

recupererProjets();

// Appel de l'API pour récupérer les catégories des filtres
async function recupererCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json();

    console.log("Catégories récupérées!", categories);
    
    buttonTous = document.createElement("button");
    buttonTous.innerText = "Tous";
    document.querySelector(".filters").appendChild(buttonTous);

    for (let i=0; i < categories.length; i++) {
        const buttonFilter = document.createElement("button");
        buttonFilter.innerText = categories[i].name;
        document.querySelector(".filters").appendChild(buttonFilter);

        console.log("Bouton de filtre ajouté!", buttonFilter);
    }
}

recupererCategories();