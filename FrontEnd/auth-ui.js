
// Modification de la page d'accueil si l'utilisateur est logué
function modifyHomePageForUserConnected(token) {
    try {
        if (token) {
        // Si l'utilisateur est "logué"
            document.querySelector(".login a").textContent = "logout"; // Modification du bouton "login" en "logout"
        
            removeFiltersForConnectedUser(); // Suppression des filtres
        
            addEditBanner(); // Ajout de la bannière "Mode édition" en haut de la page
        
            addModifyButton(); // Ajout du bouton "modifier" dans une div avec le h2 existant

            disconnectUser(); // Appel de la fonction pour gérer la déconnexion
        } 
    } catch (error) {
        console.error("Erreur dans modifyHomePageForUserConnected:", error);
    }
}

// Ajout de la bannière "Mode édition" en haut de la page
function addEditBanner() {
    try {
        const banner = document.createElement("div");
        banner.classList.add("edit-banner");
        banner.innerHTML = `
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Mode édition</p>
            `;
        const header = document.querySelector("header");
        header.before(banner);
    } catch (error) {
        console.error("Erreur dans addEditBanner:", error);
    }
}

// Suppression des filtres si l'utilisateur est logué
function removeFiltersForConnectedUser() {
    try {
        const filtersContainer = document.querySelector(".filters");
        filtersContainer.innerHTML = ""; 
    } catch (error) {
        console.error("Erreur dans removeFiltersForConnectedUser:", error);
    }
}

// Ajout du bouton "modifier" dans la section portfolio
function addModifyButton() {
    try {
        const modifyButton = document.createElement("button");
        modifyButton.classList.add("modal-button");
        modifyButton.innerHTML = `
            <i class="fa-regular fa-pen-to-square"></i>
            <p>modifier</p>
            `;
        const portfolioHeader = document.createElement("div");
        portfolioHeader.classList.add("header-portfolio");
   
        const portfolioTitle = document.querySelector("#portfolio h2");
        portfolioHeader.append(portfolioTitle, modifyButton);

        const portfolioSection = document.getElementById("portfolio");
        portfolioSection.prepend(portfolioHeader);
    } catch (error) {
        console.error("Erreur dans addModifyButton:", error);
    }
}

// Gestion de la déconnexion de l'utilisateur
function disconnectUser() {
    try {
        const loginElement = document.querySelector(".login a");
        loginElement.addEventListener("click", (event) => {
            event.preventDefault();

            window.localStorage.removeItem("authToken");
            window.location.href = "index.html";
        });
    } catch (error) {
        console.error("Erreur dans disconnectUser:", error);
    }
}       

export { modifyHomePageForUserConnected };