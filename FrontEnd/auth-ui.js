
// Modification de la page d'accueil si l'utilisateur est logué
function modifyHomePageForUserConnected(token) {
    if (token) {
    // Si l'utilisateur est "logué"
        document.querySelector(".login").textContent = "logout"; // Modification du bouton "login" en "logout"
        
        removeFiltersForConnectedUser(); // Suppression des filtres
        
        addEditBanner(); // Ajout de la bannière "Mode édition" en haut de la page
        
        addModifyButton(); // Ajout du bouton "modifier" dans une div avec le h2 existant

        disconnectUser(); // Appel de la fonction pour gérer la déconnexion
    } else {
        // L'utilisateur est "visiteur"
    }
}

// Ajout de la bannière "Mode édition" en haut de la page
function addEditBanner() {
    const banner = document.createElement("div");
        banner.classList.add("edit-banner");
        banner.innerHTML = `
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Mode édition</p>
            `;
        const header = document.querySelector("header");
        header.before(banner);
}

// Suppression des filtres si l'utilisateur est logué
function removeFiltersForConnectedUser() {
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = ""; 
}

// Ajout du bouton "modifier" dans la section portfolio
function addModifyButton() {
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
}

// Gestion de la déconnexion de l'utilisateur
function disconnectUser() {
    const loginElement = document.querySelector(".login");
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("authToken");
        window.location.href = "index.html";
    })
}       

export { modifyHomePageForUserConnected };