// Gestion des modales
import { getProjectsForModal } from './api.js';

const modal = document.querySelector("#modal"); // Sélection de la modale
const galleryModal = document.querySelector(".gallery-view"); // Sélection de la vue gallerie de la modale
const formModal = document.querySelector(".form-view"); // Sélection de la vue formulaire de la modale

// Ouverture de la modale gallerie au clic sur le bouton "modifier"
function openModalGalleryView() {
    const modifyButton = document.querySelector(".modal-button");

    modifyButton.addEventListener("click", () => {
        console.log("clic sur le bouton modifier");
        modal.style.display = "flex";
        formModal.style.display = "none";
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        getProjectsForModal(); // Récupération des projets pour affichage dans la modale
    });
}

// Ouverture de la modale formulaire au clic sur le bouton "ajouter une photo"
function openModalFormView() {   
    const addPhotoButton = document.querySelector(".modal-form-button");

    addPhotoButton.addEventListener("click", (event) => {
        console.log("clic sur le bouton ajouter une photo");

        galleryModal.style.display = "none";
        formModal.style.display = "flex";
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");       
    });
}

// Fermeture des modales
function closeModal() {
    const closeModalButton = document.querySelector(".close-modal");
    // Au clic sur la croix
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
    });
    // Au clic en dehors du wrapper
    window.addEventListener('click', (event) => {
        if (event.target === modal) { // Si on clique sur le fond noir (l'aside) et non le wrapper
        modal.style.display = 'none';
        }
    });
}

// Gestion de l'affichage des travaux de la gallerie dans la modale
function showProjectsInModal(projects) {
    const photosContainer = document.querySelector(".gallery-view .photos");
    photosContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les projets

    for (let i = 0; i < projects.length; i++) {
    
        const imageProject = document.createElement("img");
        imageProject.src = projects[i].imageUrl;
        imageProject.alt = projects[i].title;

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");

        imageProject.appendChild(trashIcon);
        photosContainer.appendChild(imageProject);

        console.log("Projet ajouté dans la modale!", imageProject);
    }
}

// Gestion de l'ouverture et de la fermeture des modales
export function initModal() {
    openModalGalleryView();
    openModalFormView();
    closeModal();
    
    console.log("Modale trouvée :", modal);
    console.log("Bouton modifier trouvé :", openModalGalleryView);
}

export { showProjectsInModal };