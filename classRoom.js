let progress = 0;
        const progressBar = document.getElementById('progress');
        const updateProgress = () => {
            progress += 10;
            if (progress > 100) progress = 0;
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';
        };

        // Eventos de los botones
        document.getElementById('prev-unit').addEventListener('click', () => {
            alert('Unidad anterior');
            updateProgress();
        });

        document.getElementById('next-unit').addEventListener('click', () => {
            alert('Siguiente unidad');
            updateProgress();
        });

        document.getElementById('upload-file').addEventListener('click', () => {
            alert('Subir archivo');
        });

        document.getElementById('send-message').addEventListener('click', () => {
            const messageInput = document.getElementById('chat-message');
            const message = messageInput.value;
            if (message) {
                const chatContainer = document.getElementById('side-chat');
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                chatContainer.appendChild(messageElement);
                messageInput.value = '';
            }
        });