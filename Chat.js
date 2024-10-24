document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const toggleVoice = document.getElementById('toggleVoice');
    const toggleMute = document.getElementById('toggleMute')
  
     // Event listener for send button
     sendMessage.addEventListener('click', async function() {
      const message = messageInput.value.trim();
      if (message) {
        addMessage(message, 'user');
        messageInput.value = '';
        addWaitingMessage(); // Añade burbuja de "esperando mensaje"
    
        try {
          const result = await chatter(message); // Espera la respuesta de chatter
          removeWaitingMessage(); // Elimina la burbuja de "esperando mensaje"
    
          if (!result) {
            addMessage('Hubo un problema con el servidor.', 'IA'); // Mensaje en caso de error
          }
        } catch (error) {
          console.error('Error en el chat:', error);
          removeWaitingMessage(); // Elimina la burbuja de "esperando mensaje" en caso de error
          addMessage('Hubo un problema con el servidor.', 'IA'); // Muestra mensaje de error
        }
      }
    });
    
  
    // Event listener for Enter key
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage.click();
      }
    });

    toggleVoice.addEventListener('click', function() {
        state.isVoiceEnabled = !state.isVoiceEnabled;
        this.innerHTML = state.isVoiceEnabled ? 
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>' : 
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg>';
        this.style.backgroundColor = state.isVoiceEnabled ? '#4bc6ff' : '#042a2b';
        this.style.color = state.isVoiceEnabled ? '#08090A' : '#4bc6ff';
    });

    toggleMute.addEventListener('click', () => {
      state.isMuted = !state.isMuted;
      toggleMute.innerHTML = state.isMuted ? 
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7h2l5 5V7L7 12H5"/><line x1="23" x2="1" y1="1" y2="23"/></svg>' : 
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7h2l5 5V7L7 12H5"/></svg>';
      toggleMute.style.backgroundColor = state.isMuted ? '#4bc6ff' : '#042a2b';
      toggleMute.style.color = state.isMuted ? '#08090A' : '#4bc6ff';
    });


    addMessage('Bienvenido! crea el curso que necesitas', 'Bot')
  });

  function addMessage(messagea, sendero) {
    const messageToAdd = {sender:sendero,message:messagea}
    const chatMessages = document.getElementById('chatMessages');

    state.chatMessages.push(messageToAdd)
    const formattedMessage = marked.parse(messagea);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sendero);
    messageElement.innerHTML = formattedMessage

    if(sendero == 'IA'){
      const button = document.createElement('button');
      button.textContent = 'Crear!'; 
      button.id = 'CreateButtonChat'
      button.style.marginTop  = '10px'; 
      button.classList.add('create-button');
  
      button.addEventListener('click', async function() {
        button.disabled = true; 
        button.classList.add('active'); 
        button.textContent = 'Creando...'; 
        button.classList.add('loading');

        let seconds = 0;
        const timerInterval = setInterval(() => {
          seconds++;
          const minutes = Math.floor(seconds / 60);
          const displaySeconds = seconds % 60;
          // Actualiza el texto del botón con el tiempo
          button.textContent = `Creando... ${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds} Estimado 2Min`;
        }, 1000);
      


        const result = await RequestCreate(messagea); 
        if(!result){
          button.textContent = 'Crear!'; 
          button.disabled = false;
          button.classList.remove('active'); 
          button.classList.remove('loading');
        }else{
          const minutes = Math.floor(seconds / 60);
          const displaySeconds = seconds % 60;
          button.textContent = `Creado en ${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`; // Muestra el tiempo transcurrido
          button.classList.remove('loading');
          clearInterval(timerInterval);
          getCourses()
        }
        
      });
  
      messageElement.appendChild(button);

    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }


  function addWaitingMessage() {
    const chatMessages = document.getElementById('chatMessages');

    const waitingMessage = document.createElement('div');
    waitingMessage.classList.add('message', 'waiting');
    waitingMessage.innerHTML = 'Esperando mensaje...';
    waitingMessage.id = 'waitingMessage'; 
    chatMessages.appendChild(waitingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function removeWaitingMessage() {
    const chatMessages = document.getElementById('chatMessages');

    const waitingMessage = document.getElementById('waitingMessage');
    if (waitingMessage) {
      chatMessages.removeChild(waitingMessage);
    }
  }

