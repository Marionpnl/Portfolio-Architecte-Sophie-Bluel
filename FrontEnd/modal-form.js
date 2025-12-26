import { addProject } from "./api";

const form = document.querySelector(".form-photo");

function submittingAddForm () {
    form.addEventListener ("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        await addProject(formData);
    })
}


