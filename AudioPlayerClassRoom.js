
let audioPlay = false ;

document.addEventListener("DOMContentLoaded", function(){
    const playPauseBtnExp = document.getElementById('playPauseBtnExp');
    playPauseBtnExp.addEventListener('click', togglePlayPauseExp);
    const playPauseBtnExa = document.getElementById('playPauseBtnExa');
    playPauseBtnExa.addEventListener('click', togglePlayPauseExa);
    const playPauseBtnTask = document.getElementById('playPauseBtnTask');
    playPauseBtnTask.addEventListener('click', togglePlayPauseTask);


});


function togglePlayPauseExp() {    
    const explain = document.getElementById("explanation");
    const playPauseBtn = document.getElementById('playPauseBtnExp')

    renderButtonAndTalk(playPauseBtn, explain)

}
function togglePlayPauseExa() {    
    const example = document.getElementById("example");
    const playPauseBtn = document.getElementById('playPauseBtnExa')

    renderButtonAndTalk(playPauseBtn, example)

}

function togglePlayPauseTask() {    
    const exam = document.getElementById("Exam");
    const playPauseBtn = document.getElementById('playPauseBtnTask')
    renderButtonAndTalk(playPauseBtn, exam)
}

function renderButtonAndTalk(button, talk){
    if(audioPlay){
        InterpreterVoice(talk.textContent)
        button.innerHTML = '■'
    }else{
        stopVoice() 
        button.innerHTML = '▶'
    }
    audioPlay = !audioPlay
}