import { addProject, getCategoriesForModalForm } from "./api.js";
import { addProjectToGallery } from "./gallery.js";

const form = document.querySelector(".form-photo");
const fileInput = document.getElementById("file-input");
const previewImage = document.querySelector(".photo-preview");
const addPhotoDiv = document.querySelector(".add-photo");
const submitBtn = document.querySelector(".submit-button");

const title = document.querySelector('input[name="title"]');
const category = document.querySelector('select[name="category"]');


// Fonction pour la prévisualisation de l'image 
function previewImageOnChange() {
    fileInput.addEventListener ("change", () => {
        const file = fileInput.files[0];
        console.log(file);

        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert ("Format invalide. JPG ou PNG uniquement");
            fileInput.value = "";
            changeButtonColorIfCompletedForm();
            return;
        }
            
        if (file.size > 4 * 1024 * 1024) {
            alert("Image trop lourde (4Mo max)");
            fileInput.value = "";
            changeButtonColorIfCompletedForm();
            return;
        }

        previewImage.src = URL.createObjectURL(file);
        addPhotoDiv.classList.add("has-preview");

        changeButtonColorIfCompletedForm();
        });
}

// Fonction pour changer la couleur du bouton si le formulaire est correctement rempli
function changeButtonColorIfCompletedForm () {
    if (title.value && category.value && fileInput.files.length > 0) {
        submitBtn.classList.add("active"); // bouton vert
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove("active"); // bouton gris
        submitBtn.disabled = true;
    }
}

// Fonction pour gérer l'envoi du formulaire au clic sur le bouton "Valider"
function submittingAddForm () {
    form.addEventListener ("submit", async (event) => {
        event.preventDefault();
        
        if (!fileInput.files.length || !title.value || !category.value) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const formData = new FormData(form);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const newProject = await addProject(formData);

        console.log("Listener submit actif");
        console.log("Projet ajouté", newProject);
        alert("Projet ajouté avec succès !");

        addProjectToGallery(newProject);

        form.reset();
        previewImage.src = "";
        addPhotoDiv.classList.remove("has-preview");
    })
}

// 
function initModalForm () {
    getCategoriesForModalForm();
    
    previewImageOnChange();

    submittingAddForm();

    title.addEventListener("input", changeButtonColorIfCompletedForm);
    category.addEventListener("change", changeButtonColorIfCompletedForm);
    
    changeButtonColorIfCompletedForm();
}

export { initModalForm };
