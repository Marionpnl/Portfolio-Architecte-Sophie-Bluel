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