
document.addEventListener("DOMContentLoaded",function(){

    const avatar = document.getElementById('avatar');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const popupPanel = document.getElementById('popupPanel');
    
    // Mostrar/ocultar menú al hacer clic en el avatar
    avatar.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    
    // Función para mostrar el popup con contenido personalizado
    function showPopup(content) {
      console.log('activated: ' + content)
      if(content == "Logout"){
        logOutSession()
        localStorage.setItem('SessionKey', null)
        state.isLoggedIn = false;
        state.user = null
        saveUserData(state.user)
        window.location.href = "index.html";
        return
      }
      if(content == "Certificado"){
        window.open('https://dev-devant.github.io/CertifyFRont/', '_blank');
        return        
      }
      if(content == "Configuración"){
        createPopupCongfig()
        return
      }
      if(content == "Pagos"){
        createPopupPay()
        return
      }
    }
    
    // Asignar acciones a cada opción del menú
    document.getElementById('configOption').addEventListener('click', () => showPopup('Configuración'));
    document.getElementById('certificateOption').addEventListener('click', () => showPopup('Certificado'));
    document.getElementById('paymentsOption').addEventListener('click', () => showPopup('Pagos'));
    document.getElementById('logoutOption').addEventListener('click', () => showPopup('Logout'));
    
    // Cerrar popup al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (!popupPanel.contains(e.target) && !avatar.contains(e.target)) {
        popupPanel.classList.add('hidden');
      }
    });

})

function createPopupCongfig() {
  // Crear el elemento del popup
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = "This is a demo";

  // Estilos inline para el popup

  // Agregar el popup al body
  document.body.appendChild(popup);

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = '1';
  }, 10);

}


function createPopupPay() {
  // Crear el elemento del popup
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = "This is a demo";

  // Estilos inline para el popup

  // Agregar el popup al body
  document.body.appendChild(popup);

  // Mostrar el popup
  setTimeout(() => {
    popup.style.opacity = '1';
  }, 10);

}