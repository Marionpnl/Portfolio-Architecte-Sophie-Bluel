import { showProjects, showCategories, showProjectsInModal } from './gallery.js';

let projects = []; // Tableau pour stocker les projets récupérés
let categories = []; // Tableau pour stocker les catégories récupérées

// Appel de l'API pour récupérer les projets
async function getProjects() {
    const response = await fetch("http://localhost:5678/api/works")
    projects = await response.json(); //liste des projets

    console.log("Projets récupérés!", projects);
    
    showProjects(projects); // Appel de la fonction pour afficher les projets
}

// Appel de l'API pour récupérer les catégories des filtres
async function getCategories(token) {
    const response = await fetch("http://localhost:5678/api/categories")
    categories = await response.json(); //liste des catégories

    console.log("Catégories récupérées!", categories);

    if (!token) {
    showCategories(categories, projects); // Appel de la fonction pour afficher les catégories
    }
}

// Appel de l'API pour récupérer les projets dans la modale
async function getProjectsForModal() {
    const response = await fetch("http://localhost:5678/api/works")
    projects = await response.json(); //liste des projets

    console.log("Projets récupérés!", projects);
    showProjectsInModal(projects); // Appel de la fonction pour afficher les projets dans la modale
}

// Appel de l'API pour supprimer les projets 
async function deleteProjects (id){
    const token = window.localStorage.getItem("authToken");

    const response = await fetch(`http://localhost:5678/api/works/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok){
        throw new Error ("Echec de la suppression, erreur API");
    }
    console.log("Projet supprimé côté API");
}

export { getProjects, getCategories, getProjectsForModal, deleteProjects };
