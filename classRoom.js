const sideChat = document.getElementById('side-chat');
const resizeHandle = document.querySelector('.resize-handle');
const mainContent = document.querySelector('.main-content');

let isResizing = false;

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

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
  const explain = document.getElementById('explanation')
  const example = document.getElementById('example')
  const exam = document.getElementById('Exam')  
  const parseExplain = marked.parse(unit.explicacion);
  const parseExample = marked.parse(unit.ejemplo);
  const parseExam = marked.parse(unit.ejercicio);

  explain.innerHTML = parseExplain
  example.innerHTML = parseExample
  exam.innerHTML = parseExam

  renderExplanation(explain,parseExplain);
  renderExplanation(example,parseExample);
  renderExplanation(exam,parseExam);
  

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

function renderExplanation(explanationElement, textContent) {
  explanationElement.innerHTML = textContent;
  
  // Agregar botón de copiar a cada bloque de código
  explanationElement.querySelectorAll('pre').forEach((block) => {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('copy-btn');
    
    // Copiar solo el contenido del bloque de código sin el botón
    copyButton.onclick = () => copyToClipboard(block.querySelector('code').textContent);
    
    block.style.position = 'relative'; // Asegura que el botón esté bien posicionado
    block.appendChild(copyButton);     // Añadir botón dentro del bloque <pre>
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  });
}
