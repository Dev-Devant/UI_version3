if (localStorage.getItem('SessionKey')) {
    const currentKey = localStorage.getItem('SessionKey');
    const isOnSession = false//checkSession(currentKey)
    if (isOnSession){
        window.location.href = "mainScreen.html";
        console.log('onSession')
    }else{
        window.location.href = "loginScreen.html";
        console.log('not session')
    }
} 