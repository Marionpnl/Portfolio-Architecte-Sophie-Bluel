import { deleteProjects } from "./api.js";

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
            console.log("Projet supprimé du DOM")
        } catch (error) {
            alert("Suppression impossible")
        }
    })
}

export {deleteProjectByTrashIcon};