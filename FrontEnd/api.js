import { showProjects, showCategories } from './gallery.js';
import { showProjectsInModal } from './modal-gallery.js';

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

// Appel de l'API pour ajouter un projet
async function addProject (formData) {
    const token = window.localStorage.getItem("authToken");

    const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        console.error("Erreur lors de l'ajout du projet");
    }

    const newProject = await response.json();
    return newProject;
}
  

async function getCategoriesForModalForm () {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const select = document.getElementById("category-photo");

    categories.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        select.appendChild(option);
    });

    console.log("Catégories récupérées dans le select")
}

export { getProjects, getCategories, getProjectsForModal, deleteProjects, addProject, getCategoriesForModalForm };
