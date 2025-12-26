    // Gestion des modales
// Import des fonctions API
import { getProjectsForModal } from './api.js';
import { deleteProjectByTrashIcon } from './modal-gallery.js';
// Déclaration des constantes
const main = document.querySelector("main"); // Sélection de la page principale
const modal = document.querySelector("#modal"); // Sélection de la modale
const galleryModal = document.querySelector(".gallery-view"); // Sélection de la vue gallerie de la modale
const formModal = document.querySelector(".form-view"); // Sélection de la vue formulaire de la modale
const backButton = document.querySelector(".back-modal"); // Sélection du bouton retour de la modale

let lastFocusedElement;

// Fonction d'ouverture des modales
function openModal (view) {
    lastFocusedElement = document.activeElement;

    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.focus()
    main.inert = true;

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
    trapFocus(modal); // Appel de la fonction pour activer le focus trap à l'ouverture de la modale
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

// Focus trap
function trapFocus(modal){
    const focusableElements = modal.querySelectorAll ("button, input, select");
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    // Ecoute des touches Tab / Shift + Tab
    modal.addEventListener("keydown", e => {
        if (e.key !== "Tab") return;

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    })
}

// Fermeture des modales
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    main.inert = false;
    lastFocusedElement?.focus();
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

    deleteProjectByTrashIcon();
}

