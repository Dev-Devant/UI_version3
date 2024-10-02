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
