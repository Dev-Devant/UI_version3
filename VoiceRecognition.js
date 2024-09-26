let voiceRec;
if (!("webkitSpeechRecognition" in window)) {
    alert("Funcionalidad de voz a texto no disponible en este navegador.");
} else {
    voiceRec = new webkitSpeechRecognition();
    voiceRec.lang = "es-AR";
    voiceRec.continuous = true;
    voiceRec.interimResults = true;
    voiceRec.addEventListener("result", voiceRectEvent);
    voiceRec.addEventListener("speechend", onSpeechEndEvent);
}

loadVoices()
function voiceRectEvent(event) {
    if(!state.isVoiceEnabled){
        return
    }
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (state.currentState == 'CreateMode'){
            const inputField = document.getElementById('messageInput');
            if (inputField) {
                inputField.value = transcript; 
                inputField.dispatchEvent(new Event('input')); 
            }
            if (event.results[i].isFinal) {
                //sendMessage()
                console.log("Sending: " + transcript)
            }
        }
        
    }
    console.log("asdasdasd")
}

function onSpeechEndEvent() {
    voiceRecOn = false;
}

//////////////////////// Genmerador de voz
function loadVoices() {
    return new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                resolve(speechSynthesis.getVoices());
            };
        }
    });
}

function InterpreterVoice(textToRead) {
    loadVoices().then((voices) => {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        const spanishVoice = voices.find(voice => voice.name === 'Microsoft Laura - Spanish (Spain)');
        if (spanishVoice) {
            utterance.voice = spanishVoice;
            speechSynthesis.speak(utterance);
        }
    });
}

function stopVoice() {
    speechSynthesis.cancel();
}
