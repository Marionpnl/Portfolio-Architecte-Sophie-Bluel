import { addProject, getCategoriesForModalForm } from "./api.js";
import { addProjectToGallery } from "./gallery.js";

const form = document.querySelector(".form-photo");

function submittingAddForm () {
    form.addEventListener ("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const newProject = await addProject(formData);

        console.log("Listener submit actif");
        console.log("Projet ajouté", newProject);

        addProjectToGallery(newProject);
        
        form.reset();
    })
}

function initModalForm () {
    getCategoriesForModalForm();
    
    submittingAddForm();
}

export { initModalForm };
