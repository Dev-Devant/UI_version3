document.addEventListener('DOMContentLoaded', () => {
    const cursandoBtn = document.getElementById('cursandoBtn');
    const completadosBtn = document.getElementById('completadosBtn');



    cursandoBtn.addEventListener('click', () => {
        cursandoBtn.classList.add('active');
        completadosBtn.classList.remove('active');
        renderizarCursos('cursando');
    });

    completadosBtn.addEventListener('click', () => {
        completadosBtn.classList.add('active');
        cursandoBtn.classList.remove('active');
        renderizarCursos('completado');
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
            <button>Entrar al curso</button>
            <p class="description">${curso.description}</p>
        `;
        cursosContainer.appendChild(cursoElement);

        cursoElement.addEventListener('click', () => {
            cursoElement.classList.toggle('expanded');
        });
    });
}