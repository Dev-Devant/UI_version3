
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

    if(audioPlay){
        InterpreterVoice(explain.textContent)
        playPauseBtn.innerHTML = '⏸'
    }else{
        stopVoice() 
        playPauseBtn.innerHTML = '▶'
    }
    audioPlay = !audioPlay
}
function togglePlayPauseExa() {    
    const example = document.getElementById("example");
    const playPauseBtn = document.getElementById('playPauseBtnExa')

    if(audioPlay){
        InterpreterVoice(example.textContent)
        playPauseBtn.innerHTML = '⏸'
    }else{
        stopVoice() 
        playPauseBtn.innerHTML = '▶'
    }
    audioPlay = !audioPlay
}

function togglePlayPauseTask() {    
    const exam = document.getElementById("Exam");
    const playPauseBtn = document.getElementById('playPauseBtnTask')

    if(audioPlay){
        InterpreterVoice(exam.textContent)
        playPauseBtn.innerHTML = '⏸'
    }else{
        stopVoice() 
        playPauseBtn.innerHTML = '▶'
    }
    audioPlay = !audioPlay
}