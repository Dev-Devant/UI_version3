const sideChat = document.getElementById('side-chat');
const resizeHandle = document.querySelector('.resize-handle');
const mainContent = document.querySelector('.main-content');

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        const newWidth = window.innerWidth - e.clientX;
        sideChat.style.width = `${newWidth}px`;
        mainContent.style.marginRight = `${newWidth}px`; // Ajusta el margen del contenido
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

////////////////////////////////////////////////////////////////////////////////////////////

let currentModuleIndex = 0;
let currentUnitIndex = 0;
let currentCourse;

// Función para cargar los datos en la interfaz
function loadContent(moduleIndex, unitIndex) {
  const module = currentCourse[moduleIndex];
  const unit = module.temas[unitIndex];
  
  // Actualizar la barra de progreso
  document.getElementById('progress').style.width = `${(moduleIndex / module.length) * 100}%`;
  
  // Actualizar los nombres de curso y módulo
  document.getElementById('course-name').textContent = module.titulo;
  document.getElementById('module-title').textContent = unit.Tema;
  
  // Actualizar las secciones de explicación, ejemplo y ejercicio
  document.getElementById('explanation').innerHTML = marked.parse(unit.explicacion);
  document.getElementById('example').innerHTML = marked.parse(unit.ejemplo);
  document.getElementById('Exam').innerHTML = marked.parse(unit.ejercicio);
}

// Manejadores para los botones de navegación
document.getElementById('prev-unit').addEventListener('click', function() {
  if (currentUnitIndex > 0) {
    currentUnitIndex--;
  } else if (currentModuleIndex > 0) {
    currentModuleIndex--;
    currentUnitIndex = currentCourse.module[currentModuleIndex].temas.length - 1;
  }
  loadContent(currentModuleIndex, currentUnitIndex);
});

document.getElementById('next-unit').addEventListener('click', function() {
  if (currentUnitIndex < currentCourse[currentModuleIndex].temas.length - 1) {
    currentUnitIndex++;
  } else if (currentModuleIndex < currentCourse[currentModuleIndex].length - 1) {
    currentModuleIndex++;
    currentUnitIndex = 0;
  }
  loadContent(currentModuleIndex, currentUnitIndex);
});
