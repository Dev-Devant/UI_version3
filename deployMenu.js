
document.addEventListener("DOMContentLoaded",function(){

    const avatar = document.getElementById('avatar');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const popupPanel = document.getElementById('popupPanel');
    const popupContent = document.getElementById('popupContent');
    
    // Mostrar/ocultar menú al hacer clic en el avatar
    avatar.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Función para mostrar el popup con contenido personalizado
    function showPopup(content) {
      popupContent.textContent = content;
      popupPanel.classList.remove('hidden');
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