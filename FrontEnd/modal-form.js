import { addProject, getCategoriesForModalForm } from "./api.js";
import { addProjectToGallery } from "./gallery.js";

const form = document.querySelector(".form-photo");
const fileInput = document.getElementById("file-input");
const previewImage = document.querySelector(".photo-preview");
const addPhotoDiv = document.querySelector(".add-photo");

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

function previewImageOnChange() {
    fileInput.addEventListener ("change", () => {
        const file = fileInput.files[0];
        console.log(file);
        
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert ("Format invalide. JPG ou PNG uniquement");
            fileInput.value = "";
            return;
        }
            
        if (file.size > 4 * 1024 * 1024) {
            alert("Image trop lourde (4Mo max)");
            fileInput.value = "";
            return;
        }

        previewImage.src = URL.createObjectURL(file);

        addPhotoDiv.classList.add("has-preview");
        });
}

function initModalForm () {
    getCategoriesForModalForm();
    
    previewImageOnChange();

    submittingAddForm();
}

export { initModalForm };
