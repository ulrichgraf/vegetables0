// Sélectionner tous les boutons avec un attribut data-content non nul
const buttons = document.querySelectorAll('.file-sidebar .btn[data-content]');

// Récupérer l'élément HTML cible par défaut
const defaultContentElement = document.getElementById('mes-documents');

// Récupérer l'élément HTML cible pour charger le contenu
const contentElement = document.getElementById('content');

// Fonction pour ajouter le spinner pendant le chargement du contenu
function showSpinner() {
  contentElement.innerHTML = '<div class="loader-box"><div class="loader-2"></div></div>';
}

// Fonction pour activer l'onglet et charger le contenu correspondant
function activateTab(tabIndex) {
  // Désactiver la classe active pour tous les boutons
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-light');
  });

  // Activer la classe active pour le bouton correspondant à l'index
  const activeButton = buttons[tabIndex];
  activeButton.classList.remove('btn-light');
  activeButton.classList.add('btn-primary');

  // Récupérer l'élément HTML dans lequel charger le contenu
  const targetElement = document.querySelector(activeButton.getAttribute('data-target'));

  // Récupérer l'élément HTML qui contient le contenu à afficher
  const contentElement = document.querySelector(activeButton.getAttribute('data-content'));

  // Ajouter le spinner pendant le chargement du contenu
  showSpinner();

  // Ajouter un délai de 2 secondes avant le chargement du contenu
  setTimeout(() => {
    // Insérer le contenu dans l'élément HTML cible
    targetElement.innerHTML = contentElement.innerHTML;
  }, 1000);
}

// Récupérer l'index de l'onglet actif depuis le stockage local
const activeTabIndex = localStorage.getItem('activeTabIndex');

// Si l'index est défini, activer l'onglet correspondant
if (activeTabIndex !== null) {
  activateTab(activeTabIndex);
} else {
  // Sinon, utiliser l'onglet par défaut
  contentElement.innerHTML = defaultContentElement.innerHTML;
}

// Boucler sur les boutons et leur ajouter un écouteur d'événement
buttons.forEach((button, index) => {
  button.addEventListener('click', event => {
    // Empêcher la soumission du formulaire (ou la redirection)
    event.preventDefault();

    // Activer l'onglet correspondant
    activateTab(index);

    // Stocker l'index de l'onglet actif dans le stockage local
    localStorage.setItem('activeTabIndex', index);
  });
});