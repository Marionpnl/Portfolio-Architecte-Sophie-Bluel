// Sauvegarde des entrées de login dans l'API
async function sauvegarderLoginData (){
    const formulaireLogin = document.querySelector("form");

    formulaireLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Il n'y a pas eu de rechargement de la page");
        // Récupération des données du formulaire
        const loginData = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        };
        const chargeUtile = JSON.stringify(loginData);

        //Envoi des données à l'API
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: chargeUtile
        })
        // Traitement de la réponse de l'API au format JSON
        const data = await response.json();

        // Vérification du statut de la réponse
        if (response.ok) {
            
            const token = data.token; // Le token est dans "data" si le statut est ok

            // Vérification que le token est présent dans "data"
            if (token) {
                // Si succès : Stockage du token dans le localStorage
                window.localStorage.setItem("authToken", token);
                console.log("Login réussi! Token stocké.", token);
                
                // Et redirection vers la page d'accueil
                window.location.href = "index.html"; 
            } else {
                // Si échec: message d'erreur
                console.error("Erreur du serveur: Token manquant dans la réponse.");
                alert("Une erreur inattendue est survenue.");
            }
        
        } else {
            // Échec : Le serveur a renvoyé un statut d'erreur (ex: 401 Unauthorized)
            console.error("Échec de la connexion. Statut:", response.status, "Message:", data.message);
            // On affiche le message d'erreur renvoyé par le serveur
            alert(data.message || "Erreur de connexion : E-mail ou mot de passe incorrect.");
        }
    })
}

sauvegarderLoginData();