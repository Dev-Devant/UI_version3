const appVersion = 'Closed Beta 1.4.3 : Si algo falla, por favor reiniciar y reportar el bug. Agradecemos cualquier comentario y sugerencia'

const subscriptionOptions = [
    { id: 1, name: 'Basic', price: 9.99, features: ['Feature 1', 'Feature 2'] },
    { id: 2, name: 'Standard', price: 19.99, features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { id: 3, name: 'Premium', price: 29.99, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 4, name: 'Pro', price: 39.99, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'] },
    { id: 5, name: 'Enterprise', price: 59.99, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'] },
    { id: 6, name: 'Ultimate', price: 99.99, features: ['All Features', 'Priority Support', 'Custom Integration'] },
];

const availableVoices = [
    { id: 'voice1', name: 'Emma (Female)' },
    { id: 'voice2', name: 'James (Male)' },
];

let slides = [
    { title: 'Artek Education Platform', content: 'Prepare for start a course' },
    //{ title: 'Slide 2', content: 'This is the content of slide 2' },
    //{ title: 'Slide 3', content: 'This is the content of slide 3' },
];

const languages = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
    { code: 'pt', name: 'PT' },
];

let courses = [];

let state = {
    currentState: 'CreateMode',
    validatedAndAbilitadedUser : false,
    creatingmode : true,
    courseSelectorMode: false,
    currentChat :"",
    currentCourseoverview: '',
    currentCourseId:'',
    CursingNow: {},
    isLoggedIn: false,
    isLogin: true,
    username: 'Usuario',
    email: '',
    password: '',
    language: 'en',
    currentSlide: 0,
    chatMessages: [],
    inputMessage: '',
    isVoiceEnabled: false,
    chatWidth: window.innerWidth *0.95,
    slideDisplay: true,
    bakgroundPlay:true,
    mainMenuOpen: false,
    isUserMenuOpen: false,
    showScrollButton: false,
    showBillingMenu: false,
    showConfigurationMenu: false,
    isPlaying: true,
    user: {
        name: 'username',
        email: '',
        tokens: 0,
        avatar: '',
        language: 'es',
        country: '',
        voice: 'voice1'
    }
};
/////////// starting logic

/*
if (localStorage.getItem('SessionKey')) {
    var currentKey = localStorage.getItem('SessionKey');
    checkSession(currentKey)
} 
function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';    
    if (!state.isLoggedIn) {
        app.appendChild(createLoginForm());
        return
    } 
    if (state.courseSelectorMode){
        app.appendChild(createEnrrols());
        if (state.showConfigurationMenu){
            app.appendChild(createConfigurationMenu())
        }
        return
    }
    if (!state.mainMenuOpen){
        app.appendChild(createMainInterface());
        if (state.showConfigurationMenu){
            app.appendChild(createConfigurationMenu())
        }
        return
    }else{
        app.appendChild(createMainMenu());
        if (state.showConfigurationMenu){
            app.appendChild(createConfigurationMenu())
        }
        return
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    render();
});

let resizeTimeout;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    state.bakgroundPlay = false
    resizeTimeout = setTimeout(() => {
        state.bakgroundPlay = true
    }, 500);
});

// Event delegation for dynamically created elements
document.addEventListener('click', (e) => {
    if (e.target.id === 'showBillingMenu') {
        state.showBillingMenu = true;
        state.isUserMenuOpen = false;
        render();
    } 
    if (e.target.id === 'showConfigurationMenu') {
        state.showConfigurationMenu = true;
        state.isUserMenuOpen = false;
        render();
    } 
    if (e.target.id === 'logout') {
        handleLogout();
    } 
    if (e.target.id === 'userLanguage') {
        handleLanguageChange(e.target.value);
    } 
    if (e.target.id === 'closeBilling') {
        state.showBillingMenu = false;
        render();
    } 
    if (e.target.id === 'closeConfiguration') {
        state.showConfigurationMenu = false;
        render();
    } 
    if (e.target.id === 'upgradePlan') {
        state.showSubscriptionOptions = true;
        render();
    } 
    if (e.target.id === 'billingBack') {
        if (state.selectedOption) {
            state.selectedOption = null;
        } else {
            state.showSubscriptionOptions = false;
        }
        render();
    } 
    if (e.target.closest('.grid-cols-1')) {
        const optionId = e.target.closest('.grid-cols-1').dataset.optionId;
        state.selectedOption = subscriptionOptions.find(option => option.id === parseInt(optionId));
        render();
    } 

    if (e.target.id === 'audioVoice') {
        const voiceId = e.target.value;
        state.user.voice = voiceId;
        render();
    }     
    if (e.target.id === 'playDemo') {
        console.log('Playing demo for voice:', state.user.voice);
    }
});

*/