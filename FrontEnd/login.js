// Variables


// Sauvegarde des entrées de login dans l'API
async function sauvegarderLoginData (){
    const formulaireLogin = document.querySelector("form");

    formulaireLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Il n'y a pas eu de rechargement de la page");

        const loginData = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        };
        const chargeUtile = JSON.stringify(loginData);

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: chargeUtile
        })
        const data= await response.json();

        if (email === userId && password === userPassword) {
            console.log("Login réussi!", data);
        }
    })
}

sauvegarderLoginData();