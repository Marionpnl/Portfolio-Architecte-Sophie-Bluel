// Appel de l'API pour récupérer les projets
async function recupererProjets() {
    const response = await fetch("http://localhost:5678/api/works")

    const projets = await response.json();
    console.log("Projets récupérés!", projets);
}

recupererProjets();