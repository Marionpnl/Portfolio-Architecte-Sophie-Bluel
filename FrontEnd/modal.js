    // Gestion des modales
// Import de la fonction API
import { getProjectsForModal } from './api.js';
// Déclaration des constantes
const modal = document.querySelector("#modal"); // Sélection de la modale
const galleryModal = document.querySelector(".gallery-view"); // Sélection de la vue gallerie de la modale
const formModal = document.querySelector(".form-view"); // Sélection de la vue formulaire de la modale
const backButton = document.querySelector(".back-modal"); // Sélection du bouton retour de la modale

// Fonction d'ouverture des modales
function openModal (view) {
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");

    if (view === "gallery") {
        galleryModal.style.display = "flex";
        formModal.style.display = "none";
        backButton.style.display = "none";
        getProjectsForModal(); // Récupération des projets pour affichage dans la modale
    }
    
    if (view === "form") {
        galleryModal.style.display = "none";
        formModal.style.display = "flex";
        backButton.style.display = "flex";
    }
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

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        
        imageSheet.appendChild(imageProject);
        imageSheet.appendChild(trashIcon);
        photosContainer.appendChild(imageSheet);

        console.log("Projet ajouté dans la modale!", imageProject);
    }
}

// Reouverture de la modale gallerie au clic sur la flèche "retour"
function backToGalleryView() {
    
    backButton.addEventListener("click", () => {
        console.log("clic sur le bouton retour");
        galleryModal.style.display = "flex";
        formModal.style.display = "none";
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        backButton.style.display = "none";
        getProjectsForModal(); // Récupération des projets pour affichage dans la modale
    })
}

// Fermeture des modales
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
}

// Gestion de l'ouverture et de la fermeture des modales
export function initModal() {
    // Déclaration des boutons
    const modifyButton = document.querySelector(".modal-button");
    const addPhotoButton = document.querySelector(".modal-form-button");
    const closeModalButton = document.querySelector(".close-modal");
    // Ajout des écouteurs d'événements pour l'ouverture des modales
    modifyButton.addEventListener("click", () => {
        console.log("clic sur le bouton modifier");
        openModal("gallery");
    });

    addPhotoButton.addEventListener("click", () => {
        console.log("clic sur le bouton ajouter une photo");
        openModal("form");
    });

    backToGalleryView();
    //Ajout des écouteurs d'événements pour la fermeture de la modale
    // Au clic sur la croix
    closeModalButton.addEventListener("click", () => {
        closeModal()
    });
    // Au clic en dehors du wrapper
    window.addEventListener('click', (event) => {
        if (event.target === modal) { // Si on clique sur le fond noir (l'aside) et non le wrapper
            closeModal()
        }
    });
    // A l'appuie sur la touche Echap/Escape/Esc
    window.addEventListener ("keydown", (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal()
        }
    })
    console.log("Modale trouvée :", modal);
    console.log("Bouton modifier trouvé :", openModal);
}

export { showProjectsInModal };