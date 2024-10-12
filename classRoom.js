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

  // Calcular el progreso total (porcentaje de unidades completadas)
  const overallProgress = unitsSoFar / totalUnitsInCourse;

  // Actualizar la barra de progreso
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
document.getElementById("prev-unit").addEventListener("click", function () {
  if (currentUnitIndex > 0) {
    currentUnitIndex--;
  } else if (currentModuleIndex > 0) {
    currentModuleIndex--;
    currentUnitIndex = currentCourse[currentModuleIndex].temas.length - 1;
  } else {
    return;
  }
  loadContent(currentModuleIndex, currentUnitIndex);
});

document.getElementById("next-unit").addEventListener("click", function () {
  let absoluteIndex = getAbsoluteUnitIndex();
  if (!currentCourseData[absoluteIndex + 1] && currentCourseData[absoluteIndex + 1] != null) {
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

  loadContent(currentModuleIndex, currentUnitIndex);
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

document.addEventListener("DOMContentLoaded", function () {
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
  /*document.getElementById("upload-file").addEventListener("click", function () {
    alert("Aun no esta disponible");
  });
  */
});

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
