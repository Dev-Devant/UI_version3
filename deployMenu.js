document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.getElementById("avatar");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const popupPanel = document.getElementById("popupPanel");

  // Mostrar/ocultar menú al hacer clic en el avatar
  avatar.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  // Función para mostrar el popup con contenido personalizado
  function showPopup(content) {
    if (content == "Logout") {
      logOutSession();
      localStorage.setItem("SessionKey", null);
      state.isLoggedIn = false;
      state.user = null;
      saveUserData(state.user);
      window.location.href = "index.html";
      return;
    }
    if (content == "Certificado") {
      window.open("https://dev-devant.github.io/CertifyFRont/", "_blank");
      return;
    }
    if (content == "Configuración") {
      createPopupCongfig();
      return;
    }
    if (content == "Pagos") {
      createPopupPay();
      return;
    }
  }

  // Asignar acciones a cada opción del menú
  document
    .getElementById("configOption")
    .addEventListener("click", () => showPopup("Configuración"));
  document
    .getElementById("certificateOption")
    .addEventListener("click", () => showPopup("Certificado"));
  document
    .getElementById("paymentsOption")
    .addEventListener("click", () => showPopup("Pagos"));
  document
    .getElementById("logoutOption")
    .addEventListener("click", () => showPopup("Logout"));

  // Cerrar popup al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (!popupPanel.contains(e.target) && !avatar.contains(e.target)) {
      popupPanel.classList.add("hidden");
    }
  });
});

function createPopupCongfig() {
  // Crear el elemento del popup
  const popup = document.createElement("div");
  popup.className = "popup";

  const menu = `<div class="menu-overlay">
    <div class="menu-container">
        <div class="menu-header">
            <h2>Configuracion</h2>
            <button id="closeConfiguration" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
        </div>
        
        <div class="menu-content">
            <div>
                <h3>Cambiar nombre de usuario</h3>
                <div class="input-group">
                    <input type="text" id="newUsername" value="${state.user.name}" class="input-field" />
                    <button id="updateUsername" class="button">Actualizar</button>
                </div>
            </div>

            <div>
                <h3>Cambiar contraseña</h3>
                <div class="input-group">
                    <input type="password" id="currentPassword" placeholder="Contraseña actual" class="input-field" />
                    <input type="password" id="newPassword" placeholder="Nueva contraseña" class="input-field" />
                    <input type="password" id="confirmPassword" placeholder="Confirmar nueva contraseña" class="input-field" />
                    <button id="changePassword" class="button">Cambiar</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

  popup.innerHTML = menu;


  document.body.appendChild(popup);

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}

function createPopupPay() {
  // Crear el elemento del popup
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = "This is a demo";

  // Estilos inline para el popup

  // Agregar el popup al body
  document.body.appendChild(popup);

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}
