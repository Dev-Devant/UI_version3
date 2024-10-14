const sideChat = document.getElementById("side-chat");
const resizeHandle = document.querySelector(".resize-handle");
const mainContent = document.querySelector(".main-content");

let isResizing = false;

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  langPrefix: "hljs language-",
});

resizeHandle.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
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
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

////////////////////////////////////////////////////////////////////////////////////////////

let currentModuleIndex = 0;
let currentUnitIndex = 0;
let currentCourse;
let currentCourseData;
let courseId;

// Función para cargar los datos en la interfaz
function loadContent(moduleIndex, unitIndex) {
  const module = currentCourse[moduleIndex];
  const unit = module.temas[unitIndex];

  // Obtener la cantidad total de unidades en todos los módulos
  let totalUnitsInCourse = 0;
  currentCourse.forEach((mod) => (totalUnitsInCourse += mod.temas.length));

  // Obtener la posición actual en términos de unidades
  const unitsSoFar = getAbsoluteUnitIndex();
  const overallProgress = unitsSoFar / totalUnitsInCourse;
  document.getElementById("progress").style.width = `${overallProgress * 100}%`;

  // Actualizar los nombres de curso y módulo
  document.getElementById("course-name").textContent = module.titulo;
  document.getElementById("module-title").textContent = unit.Tema;
  // Actualizar las secciones de explicación, ejemplo y ejercicio
  const explain = document.getElementById("explanation");
  const example = document.getElementById("example");
  const exam = document.getElementById("Exam");

  const parseExplain = marked.parse(unit.explicacion);
  const parseExample = marked.parse(unit.ejemplo);
  const parseExam = marked.parse(unit.ejercicio);

  explain.innerHTML = parseExplain;
  example.innerHTML = parseExample;
  exam.innerHTML = parseExam;

  renderExplanation(explain, parseExplain);
  renderExplanation(example, parseExample);
  renderExplanation(exam, parseExam);

  const uploadTaskCode = `<textarea id="chat-message" placeholder="Escribe tu mensaje..."></textarea>
              <!--<button id="upload-file">Subir Archivo</button> -->
            <button id="send-message"><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>`;
  const uploadTask = document.getElementById("TaskSubmit");
  const value = currentCourseData[getAbsoluteUnitIndex()];
  if (!value) {
    uploadTask.innerHTML = uploadTaskCode;
    const textInputTask = document.getElementById("chat-message");
    const feedback = document.getElementById("feedback");
    const sendButton = document.getElementById("send-message");

    sendButton.addEventListener("click", async function () {
      const task = document.getElementById("Exam").textContent;
      const message = textInputTask.value.trim();

      if (message == "" || message == null) {
        return;
      }

      feedback.innerHTML = "";
      addReviewTaskWait();
      const response = await sendTask(message, task);
      if (!response) {
        textInputTask.value = "";
        removeReviewTaskWait();
        loadContent(currentModuleIndex, currentUnitIndex);
        return;
        // soluciono el bug que aparece la tarea y no deberia
      }

      if (response != null) {
        if (response.IAResp.includes("APROBED")) {
          response.IAResp = response.IAResp.replace("APROBED", "");
          if (
            currentUnitIndex <
            currentCourse[currentModuleIndex].temas.length - 1
          ) {
            currentUnitIndex++;
          } else if (currentModuleIndex < currentCourse.length - 1) {
            currentModuleIndex++;
            currentUnitIndex = 0;
          }

          let absoluteIndex = getAbsoluteUnitIndex();
          currentCourseData[absoluteIndex] = true;
          loadContent(currentModuleIndex, currentUnitIndex);
          updateCourseTraker(courseId);
          removeReviewTaskWait();
          textInputTask.value = "";
          return;
        }
        feedback.innerHTML = marked.parse(response.IAResp);
      } else {
        feedback.textContent = "Server Internal error, resend";
      }

      removeReviewTaskWait();
      textInputTask.value = "";
    });

    textInputTask.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
      }
    });
  } else {
    uploadTaskCode.innerHTML = "";
  }
}

function getAbsoluteUnitIndex() {
  let absoluteIndex = 0;
  for (let i = 0; i < currentModuleIndex; i++) {
    absoluteIndex += currentCourse[i].temas.length; // Suma las unidades de módulos anteriores
  }
  absoluteIndex += currentUnitIndex; // Suma la unidad actual
  return absoluteIndex;
}

// Manejadores para los botones de navegación
function previewUnit() {
  if (currentUnitIndex > 0) {
    currentUnitIndex--;
  } else if (currentModuleIndex > 0) {
    currentModuleIndex--;
    currentUnitIndex = currentCourse[currentModuleIndex].temas.length - 1;
  } else {
    return;
  }
  stopVoice();
  loadContent(currentModuleIndex, currentUnitIndex);
}

function nextUnit() {
  let absoluteIndex = getAbsoluteUnitIndex();
  if (
    !currentCourseData[absoluteIndex] &&
    currentCourseData[absoluteIndex] != null
  ) {
    alert("Completa la actividad para continuar el curso");
    return;
  }
  if (currentUnitIndex < currentCourse[currentModuleIndex].temas.length - 1) {
    currentUnitIndex++;
  } else if (currentModuleIndex < currentCourse.length - 1) {
    currentModuleIndex++;
    currentUnitIndex = 0;
  } else {
    return;
  }
  stopVoice();
  loadContent(currentModuleIndex, currentUnitIndex);
}

document.getElementById("prev-unit").addEventListener("click", previewUnit);
document.getElementById("prev-unita").addEventListener("click", previewUnit);
document.getElementById("next-unit").addEventListener("click", nextUnit);
document.getElementById("next-unita").addEventListener("click", nextUnit);

document.getElementById("download-PDF").addEventListener("click", function () {
  alert('Disponible pronto!')
  return
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4"); // Formato A4

  const courseTitle = document.getElementById("currentModeDisplay").textContent;
  const explicacionPage = document.getElementById("explanation");
  const ExamplePage = document.getElementById("example");

  pdf.html(explicacionPage, {
    x: 10, // Margen izquierdo
    y: 10, // Margen superior
    width: 190, // Ancho disponible en A4 (210 mm de ancho - márgenes)
    windowWidth: document.body.scrollWidth,
    callback: function (doc) {
      // Agregar una nueva página
      pdf.addPage();
      // Agregar contenido de la segunda página
      pdf.html(ExamplePage, {
        x: 10,
        y: 10,
        width: 190,
        windowWidth: document.body.scrollWidth,
        callback: function (doc) {
          doc.save(courseTitle + ".pdf");
        },
      });
    },
  });
});

function renderExplanation(explanationElement, textContent) {
  explanationElement.innerHTML = textContent;

  // Agregar botón de copiar a cada bloque de código
  explanationElement.querySelectorAll("pre").forEach((block) => {
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy-btn");

    // Copiar solo el contenido del bloque de código sin el botón
    copyButton.onclick = () =>
      copyToClipboard(block.querySelector("code").textContent);

    block.style.position = "relative";
    block.appendChild(copyButton);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

function addReviewTaskWait() {
  const feedback = document.getElementById("feedback");

  const waitingMessage = document.createElement("div");
  waitingMessage.classList.add("message", "waiting");
  waitingMessage.innerHTML = "Revisando...";
  waitingMessage.id = "waitingMessageTask";
  feedback.appendChild(waitingMessage);
  feedback.scrollTop = chatMessages.scrollHeight;
}

function removeReviewTaskWait() {
  const feedback = document.getElementById("feedback");

  const waitingMessage = document.getElementById("waitingMessageTask");
  if (waitingMessage) {
    feedback.removeChild(waitingMessage);
  }
}
