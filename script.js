let currentSection = 1;
let isTransitioning = false; // Para evitar superposiciones de transiciones

let navButtons, sections, sidebar, toggleSidebar, main;

document.addEventListener("DOMContentLoaded", function () {
  navButtons = document.querySelectorAll(".nav-button");
  sections = document.querySelectorAll("section");
  sidebar = document.getElementById("sidebar");
  toggleSidebar = document.getElementById("toggleSidebar");
  main = document.querySelector("main");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sectionNumber = parseInt(this.getAttribute("data-section"));
      if (sectionNumber !== currentSection && !isTransitioning) {
        showSection(sectionNumber);
      }
      updateCurrentModeDisplay(this.textContent);
      stopVoice()
    });
  });

  toggleSidebar.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("expanded");
  });
});

function updateHeader() {
  updateStateUser();
  const userNameElement = document.getElementById("userName");
  const userTokensElement = document.getElementById("userTokens");

  if (userNameElement && state.user && state.user.name) {
    userNameElement.textContent = state.user.name;
  }

  if (userTokensElement && state.user && state.user.tokens !== undefined) {
    userTokensElement.textContent = `${state.user.tokens} tokens`;
  }
}

function updateCurrentModeDisplay(newText) {
  const displayElement = document.getElementById("currentModeDisplay");
  if (displayElement) {
    displayElement.textContent = newText;
  } else {
    console.error('Element with id "currentModeDisplay" not found');
  }
}
function showSection(sectionNumber) {
  if (isTransitioning) return; // Si está en transición, no hacer nada

  const previousSection = document.getElementById(`section${currentSection}`);
  const nextSection = document.getElementById(`section${sectionNumber}`);

  isTransitioning = true; // Bloquear nuevas transiciones

  if (sectionNumber > currentSection) {
    previousSection.classList.add("slide-up");
    nextSection.classList.add("slide-down");
  } else {
    previousSection.classList.add("slide-down");
    nextSection.classList.add("slide-up");
  }

  // Forzar el reflow para que la animación ocurra
  nextSection.offsetHeight;

  previousSection.classList.remove("active");
  nextSection.classList.remove("slide-up", "slide-down");
  nextSection.classList.add("active");

  // Actualizar botón activo
  navButtons.forEach((button) => button.classList.remove("active"));
  const activeButton = document.querySelector(
    `[data-section="${sectionNumber}"]`
  );
  activeButton.classList.add("active");

  currentSection = sectionNumber;

  // Limpiar las clases después de la animación y permitir nuevas transiciones
  setTimeout(() => {
    previousSection.classList.remove("slide-up", "slide-down");
    isTransitioning = false; // Permitir nuevas transiciones
  }, 500);
}
document.addEventListener("DOMContentLoaded", updateHeader);
