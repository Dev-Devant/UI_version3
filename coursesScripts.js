document.addEventListener('DOMContentLoaded', () => {
    const cursosContainer = document.getElementById('cursos-container');
    const cursandoBtn = document.getElementById('cursandoBtn');
    const completadosBtn = document.getElementById('completadosBtn');

    const cursos = [
        {
            id: 1,
            titulo: "Introducción a JavaScript",
            descripcion: "Aprende los fundamentos de JavaScript, incluyendo variables, funciones, y estructuras de control.",
            tags: ["JavaScript", "Programación", "Web"],
            porcentajeCompletado: 75,
            puntuacion: 4.5,
            estado: "cursando"
        },
        {
            id: 2,
            titulo: "CSS Avanzado",
            descripcion: "Domina técnicas avanzadas de CSS como Flexbox, Grid, y animaciones.",
            tags: ["CSS", "Diseño Web", "Frontend"],
            porcentajeCompletado: 100,
            puntuacion: 5,
            estado: "completado"
        },
        // Agrega más cursos aquí...
    ];

    function renderizarCursos(estado) {
        cursosContainer.innerHTML = '';
        cursos.filter(curso => curso.estado === estado).forEach(curso => {
            const cursoElement = document.createElement('div');
            cursoElement.className = 'curso-card';
            cursoElement.innerHTML = `
                <h2>${curso.titulo}</h2>
                <div class="tags">
                    ${curso.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${curso.porcentajeCompletado}%"></div>
                </div>
                <div class="rating">
                    ${'★'.repeat(Math.floor(curso.puntuacion))}${'☆'.repeat(5 - Math.floor(curso.puntuacion))}
                </div>
                <button>Entrar al curso</button>
                <p class="description">${curso.descripcion}</p>
            `;
            cursosContainer.appendChild(cursoElement);

            cursoElement.addEventListener('click', () => {
                cursoElement.classList.toggle('expanded');
            });
        });
    }

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

    // Inicialmente, mostrar cursos en progreso
    renderizarCursos('cursando');
});