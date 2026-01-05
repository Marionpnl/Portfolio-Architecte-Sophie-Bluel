import { deleteProjects, getProjects } from "./api.js";

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

// Suppression des photos de la gallerie de modale au clic sur l'icone poubelle
function deleteProjectByTrashIcon () {
    const galleryModal = document.querySelector (".gallery-view .photos");

    galleryModal.addEventListener ("click", async (event) => {
        const trashIcon = event.target.closest(".fa-solid, .fa-trash-can");
        if (!trashIcon) return;

        const id = trashIcon.dataset.id;
        const figure = trashIcon.closest("figure");
        try {
            await deleteProjects(id);
            figure.remove();
            await getProjects();
            console.log("Projet supprimé du DOM")
        } catch (error) {
            alert("Suppression impossible")
        }
    })
}

export { showProjectsInModal, deleteProjectByTrashIcon };