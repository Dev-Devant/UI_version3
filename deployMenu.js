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

  const Close = document.getElementById("closeConfiguration");
  const ChangePass = document.getElementById("changePassword");
  const ChangeUser = document.getElementById("updateUsername");

  Close.addEventListener("click", function () {
    popup.remove();
  });

  ChangePass.addEventListener("click", function (event) {
      const actual = document.getElementById("currentPassword").value;
      const newPass = document.getElementById("newPassword").value;
      const conf = document.getElementById("confirmPassword").value;
      if (newPass.length < 6) {
        alert("debe tener almenos 6 caracteres");
        return;
      }
      if (newPass != conf) {
        alert("Las contraseñas no coinciden");
        return;
      }

      changePassRequest(actual, newPass, conf);
    });

  ChangeUser.addEventListener("click", function (event) {
      const newName = document.getElementById("newUsername").value;
      if (newName == state.user.name) {
        alert("Ya tienes ese nombre");
        return;
      }
      changenameRequest(newName);
    });
  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}

function createPopupPay() {
  const popup = document.createElement("div");
  popup.className = "popup";

  const completeBuild = `
    <div class="container" id="Poppins">
        <div class="modal">
            <div class="header">
                <div class="flex items-center">
                    <h2 class="title">Comprar cursos ( tokens )</h2>
                </div>
                  <button id="closeBilling" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                        <line x1="18" x2="6" y1="6" y2="18"/>
                        <line x1="6" x2="18" y1="6" y2="18"/>
                    </svg>
                  </button>
            </div>
            <div class="subscription-options">
                ${subscriptionOptions
                  .map(
                    (option) => `
                    <div class="subscription-option ${
                      state.selectedOption === option ? "selected" : ""
                    }" data-option-id="${option.id}">
                        <h3 class="option-title">${option.name}</h3>
                        <p class="option-price">$${option.price.toFixed(2)} / month</p>
                        <ul class="option-features">
                            ${option.features
                              .map((feature) => 
                                `<li class="truncate">${feature}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    </div>
    `;

  popup.innerHTML = completeBuild;
  document.body.appendChild(popup);

  const closeBtn = document.getElementById("closeBilling");
  closeBtn.addEventListener("click", function () {
    popup.remove();
  });

  // Agregar event listeners a las opciones de suscripción
  document.querySelectorAll('.subscription-option').forEach(option => {
    option.addEventListener('click', function () {
      const optionId = this.getAttribute('data-option-id');
      const selectedOption = subscriptionOptions.find(opt => opt.id == optionId);
      createPopupOption(selectedOption);  // Llamar la función con la opción seleccionada
    });
  });

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}



function createPopupOption(data) {
  const prevPop = document.getElementById("Poppins"); 
  prevPop.remove();    
  const popup = document.createElement("div");
  popup.className = "popup";

  const completeBuild = `
    <div class="container">
        <div class="modal">
                  <button id="closeBilling" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                        <line x1="18" x2="6" y1="6" y2="18"/>
                        <line x1="6" x2="18" y1="6" y2="18"/>
                    </svg>
                  </button>
            <div>
                <h3 class="text-lg font-semibold text-[#4bc6ff] mb-2">Selected Plan: ${
                  data.name
                }</h3>
                <p class="text-[#bbbec6] mb-4">Price: $${data.price.toFixed(
                  2
                )} / month</p>
                <h4 class="text-sm font-semibold text-[#4bc6ff] mb-2">Choose Payment Method</h4>
                <div class="flex flex-wrap gap-2">
                    <button class="button">Pay with Stripe</button>
                </div>
            </div>
        </div>
    </div>
    `


  popup.innerHTML = completeBuild
  document.body.appendChild(popup);

  const Close = document.getElementById("closeBilling");

  Close.addEventListener("click", function () {
    popup.remove();
  });


  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}