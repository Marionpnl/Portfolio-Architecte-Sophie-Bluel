// Sauvegarde des données de login dans l'API
async function saveLoginData (){
    try {
        const loginForm = document.querySelector("form");

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault(); 
            // Récupération des données du formulaire
            const loginData = {
                email: event.target.querySelector("#email").value,
                password: event.target.querySelector("#password").value
            };
            const payLoad = JSON.stringify(loginData);
            //Envoi des données à l'API
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: payLoad
            })
            // Traitement de la réponse de l'API au format JSON
            const data = await response.json();
            // Appel de la fonction pour gérer la réponse:
            handleResponse(response, data);
        })
    } catch (error) {
        console.error("Erreur dans saveLoginData:", error);
    }
}

// Vérification du statut de la réponse
function handleResponse(response, data) {
    try {
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
            alert(data.message || "Erreur dans l'identifiant ou le mot de passe");
        }
    } catch (error) {
        console.error("Erreur dans handleResponse:", error);
    }
}

saveLoginData();