document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.getElementById("avatar");
  const dropdownMenu = document.getElementById("dropdownMenu");
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
      createPopupConfig();
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
});

function createPopupConfig() {
  cleanGabagePopups();
  const popup = document.createElement("div");
  popup.className = "popup";


  const menu = `
    <div class="container" id="Poppins" style="max-height: 80vh; overflow-y: auto;>
        <div class="modal" style="max-height: 80vh; overflow-y: auto;">
            <div class="header">
                <div class="flex items-center">
                    <h2 class="title">Configuración</h2>
                </div>
                <button id="closeConfiguration" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" x2="6" y1="6" y2="18"/>
                        <line x1="6" x2="18" y1="6" y2="18"/>
                    </svg>
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
                    <form id="changePasswordForm">
                        <input type="text" id="hiddenUsername_${Date.now()}" name="username" value="${state.user.name}" style="display: none;" autocomplete="username" />
                        <div class="input-group">
                            <input type="password" id="currentPasswordConfig" placeholder="Contraseña actual" class="input-field" autocomplete="current-password" />
                            <input type="password" id="newPasswordConfig" placeholder="Nueva contraseña" class="input-field" autocomplete="new-password" />
                            <input type="password" id="confirmPasswordConfig" placeholder="Confirmar nueva contraseña" class="input-field" autocomplete="new-password" />
                            <button type="submit" id="changePassword" class="button">Cambiar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  `;

  popup.innerHTML = menu;
  document.body.appendChild(popup);

  const closeBtn = document.getElementById("closeConfiguration");
  const changePassForm = document.getElementById("changePasswordForm");
  const changeUser = document.getElementById("updateUsername");

  closeBtn.addEventListener("click", function () {
    popup.remove();
  });

  changePassForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const actual = document.getElementById("currentPasswordConfig").value;
    const newPass = document.getElementById("newPasswordConfig").value;
    const conf = document.getElementById("confirmPasswordConfig").value;

    if (newPass.length < 6) {
      alert("Debe tener al menos 6 caracteres");
      return;
    }
    if (newPass !== conf) {
      alert("Las contraseñas no coinciden");
      return;
    }

    changePassRequest(actual, newPass, conf);
  });

  changeUser.addEventListener("click", function () {
    const newName = document.getElementById("newUsername").value;
    if (newName === state.user.name) {
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
  cleanGabagePopups();
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
                        <h2 class="option-title">${option.name}</h2>
                        <h6 class="option-price">USD ${option.price} / Mes</h6>
                        <h4 class="option-price">Total con impuestos: <br> 
                        USD ${option.totalPrice} <br>
                        ARS ${option.totalARS} </h4>

                        <ul class="option-features">
                            ${option.features
                              .map(
                                (feature) =>
                                  `<li class="truncate"> - ${feature}</li>`
                              )
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
    return;
  });

  // Agregar event listeners a las opciones de suscripción
  document.querySelectorAll(".subscription-option").forEach((option) => {
    option.addEventListener("click", function () {
      const optionId = this.getAttribute("data-option-id");
      const selectedOption = subscriptionOptions.find(
        (opt) => opt.id == optionId
      );
      createPopupOption(selectedOption);
    });
  });

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}

function createPopupOption(data) {
  cleanGabagePopups();
  const popup = document.createElement("div");
  popup.className = "popup";
  const paymentSection =
    data.totalPrice === "?"
      ? `
  <div class="contact-form">
      <h4 class="text-sm font-semibold text-[#4bc6ff] mb-2">Contáctanos</h4>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeUVhc2siqaUjUQwhnv5STRtBSJCWgeoOEgWbUOx0xam_gsYw/viewform?embedded=true" 
      width="640" height="300" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
  </div>
`
      : `
  <h4 class="text-sm font-semibold text-[#4bc6ff] mb-2">Elegir método de pago</h4>
  <div class="flex flex-wrap gap-2">
      <button class="button" id="stripePay">
          <img src="data/Stripe.jpg" alt="Stripe" class="logo" />
      </button>
      <button class="button" id="mlPay">
          <img src="data/mercadoLibre.png" alt="Mercado Libre" class="logo" />
      </button>
      <button class="button" id="modoPay">
          <img src="data/modo.png" alt="Modo" class="logo" />
      </button>
  </div>
`;
  const completeBuild = `
    <div class="container">
        <div class="modal">
                  <button id="BackBilling" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                        <polyline points="15 18 9 12 15 6"/> <!-- Flecha hacia la izquierda -->
                    </svg>
                  </button>

                  <button id="closeBillinga" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                        <line x1="18" x2="6" y1="6" y2="18"/>
                        <line x1="6" x2="18" y1="6" y2="18"/>
                    </svg>
                  </button>
            <div>
                <h2 class="option-title">${data.name}</h2>
                <p class="text-[#bbbec6] mb-4">Price: $${data.price} / month</p>
               
                        <h6 class="option-price">USD ${data.price} / Mes</h6>
                        <h4 class="option-price">Total con impuestos: <br> 
                        USD ${data.totalPrice} </h4>
                        <br>

                        <h2 class="option-price"> Pagaras:ARS ${
                          data.totalARS
                        } </h2>

                        <ul class="option-features">
                            ${data.features
                              .map(
                                (feature) =>
                                  `<li class="truncate"> - ${feature}</li>`
                              )
                              .join("")}
                        </ul>
                        ${paymentSection}          
            </div>
        </div>
    </div>
    `;

  popup.innerHTML = completeBuild;
  document.body.appendChild(popup);

  const Close = document.getElementById("closeBillinga");

  Close.addEventListener("click", function () {
    popup.remove();
    return;
  });

  const Back = document.getElementById("BackBilling");

  Back.addEventListener("click", function () {
    popup.remove();
    createPopupPay();
    return;
  });

  if (data.totalPrice != "?") {
    const ml = document.getElementById("mlPay");
    const modo = document.getElementById("modoPay");
    const stripe = document.getElementById("stripePay");

    ml.addEventListener("click", function () {
      popup.remove();
      createPopupMercadoLibre(data)
      return;
    });

    modo.addEventListener("click", function () {
      alert("Aun no disponible, por favor use Mercado libre");
      return;
    });

    stripe.addEventListener("click", function () {
      alert("Aun no disponible, por favor use Mercado libre");
      return;
    });
  }

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}


function createPopupMercadoLibre(data) {
  cleanGabagePopups();
  const popup = document.createElement("div");
  popup.className = "popup";
  const completeBuild = `
    <div class="container">
<<<<<<< HEAD
      <div class="modal">
        <div class="modal-header">
          
          <button id="BackBilling">Back</button>
          <button id="closeBillinga">Close</button>
        </div>
          <h2>Estas por adquirir</h2>
          <h2 class="option-title">${data.name}</h2>

        <div id="mercadopago-button-container" style="width: 100%; height: 50px; margin-top: 20px;"></div>
      </div>
=======
        <div class="modal">
            <button id="BackBilling" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <polyline points="15 18 9 12 15 6"/> <!-- Flecha hacia la izquierda -->
                </svg>
            </button>

            <button id="closeBillinga" class="text-[#bbbec6] hover:text-[#4bc6ff] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <line x1="18" x2="6" y1="6" y2="18"/>
                    <line x1="6" x2="18" y1="6" y2="18"/>
                </svg>
            </button>
            <div>
                <h2 class="option-title">${data.name}</h2>
                <p class="text-[#bbbec6] mb-4">Price: $${data.price} / month</p>
               
                <h6 class="option-price">USD ${data.price} / Mes</h6>
                <h4 class="option-price">Total con impuestos: <br> 
                USD ${data.totalPrice} </h4>
                <script src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                    data-preference-id="316205094-246ab804-ab87-4639-9b2a-d6395a7f7a1a" data-source="button">
                </script>  
            </div>
        </div>
>>>>>>> b2eeb0825186033616687b9b96045d274b48b57a
    </div>
  `;

  popup.innerHTML = completeBuild;
  document.body.appendChild(popup);

  // Agregar el script de Mercado Libre después de que el contenedor esté en el DOM
  const script = document.createElement('script');
  script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  script.dataset.preferenceId = "316205094-246ab804-ab87-4639-9b2a-d6395a7f7a1a";
  script.dataset.source = "button";
  document.getElementById('mercadopago-button-container').appendChild(script);

  // ... (resto del código para los botones de cierre y retroceso)

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}




function cleanGabagePopups() {
  const prevPopup = document.querySelector(".popup");
  if (prevPopup) {
    prevPopup.remove();
  }
  const prevCont = document.querySelector(".container");
  if (prevCont) {
    prevPopup.remove();
  }
}
