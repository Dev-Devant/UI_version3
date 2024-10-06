document.addEventListener('DOMContentLoaded', () => {
    const cursandoBtn = document.getElementById('cursandoBtn');
    const completadosBtn = document.getElementById('completadosBtn');



    cursandoBtn.addEventListener('click', () => {
        cursandoBtn.classList.add('active');
        completadosBtn.classList.remove('active');
        renderizarCursos(false);
    });

    completadosBtn.addEventListener('click', () => {
        completadosBtn.classList.add('active');
        cursandoBtn.classList.remove('active');
        renderizarCursos(true);
    });

});

function renderizarCursos(state) {
    const cursosContainer = document.getElementById('cursos-container');

    cursosContainer.innerHTML = '';
    courses.filter(curso => curso.state === state).forEach(curso => {
        const cursoElement = document.createElement('div');
        cursoElement.className = 'curso-card';
        cursoElement.innerHTML = `
            <h2>${curso.title}</h2>
            <div class="tags">
                ${curso.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${curso.progress}%"></div>
            </div>
            <div class="rating">
                ${'★'.repeat(Math.floor(curso.score))}${'☆'.repeat(5 - Math.floor(curso.score))}
            </div>
            <button class="enter-course-btn">Entrar al curso</button>
            <p class="description">${curso.description}</p>
            <button class="close-btn">x</button> <!-- Botón de cerrar -->
        `;
        cursosContainer.appendChild(cursoElement);

        // Evento para expandir/encoger
        cursoElement.addEventListener('click', () => {
            cursoElement.classList.toggle('expanded');
        });

        // Evento para cerrar el curso
        const closeBtn = cursoElement.querySelector('.close-btn');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            cursoElement.classList.remove('expanded');
        });

        // Evento para el botón "Entrar al curso"
        const previousSection = document.getElementById(`section${3}`);

        const nextSection = document.getElementById(`section${4}`);
        const enterCourseBtn = cursoElement.querySelector('.enter-course-btn');
        enterCourseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            nextSection.classList.add("slide-down");
            previousSection.classList.add("slide-up");
            nextSection.offsetHeight;

            previousSection.classList.remove("active");
            nextSection.classList.remove("slide-up", "slide-down");
            nextSection.classList.add("active");

            currentCourse = curso.content.modulos
            currentModuleIndex = 0
            currentUnitIndex = 0
            loadContent(0, 0)
        });
    });
}

