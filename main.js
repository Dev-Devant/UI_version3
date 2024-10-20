const appVersion = 'Closed Beta 1.4.3 : Si algo falla, por favor reiniciar y reportar el bug. Agradecemos cualquier comentario y sugerencia'

let subscriptionOptions = [
    { id: 1, name: 'Basic', price: 9.99, features: ['3 cursos','Ideal para dar tus primeros pasos'] },
    { id: 2, name: 'Standard', price: 29.99, features: ['10 cursos', 'Ideal para soporte academico'] },
    { id: 3, name: 'Premium', price: 49.99, features: ['20 cursos', 'Para una formacion completa'] },
    { id: 4, name: 'Ultimate', price: 39.99, features: ['Subscripcion mensual (Cancela cuando quieras!)', 'Cursos ilimitados!', 'Conferencias virtuales incluidas', 'Foro de soporte'] },
    { id: 5, name: 'Enterprise', price: 'Contactar con ventas', features: ['Formaciones para equipos de trabajo y empresas', 'seguimiento y control de grupos y conocmiento adquiridos', 'diseño de curriculas asistido'] }
];

const subscriptionOptionsWithTax = subscriptionOptions.map(option => {
  if (typeof option.price === 'number') {
      const tax = option.price * 0.6; 
      const totalPrice = option.price + tax; 

      return {
          ...option,
          totalPrice: totalPrice.toFixed(2) 
      };
  }
  return option; 
});

subscriptionOptions = subscriptionOptionsWithTax




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
    validatedAndAbilitadedUser : false,
    isLogin: true,
    language: 'en',
    chatMessages: [],
    isMuted: false,
    isVoiceEnabled: false,
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


let discoverCoursesPreload = {
    Recomend : [
            {
              title: "Introduction to JavaScript",
              description: "Learn the basics of JS",
              rating: 4.5,
            },
            {
              title: "Advanced CSS Techniques",
              description: "Master modern CSS",
              rating: 4.8,
            },
            {
              title: "Web Accessibility Fundamentals",
              description: "Create inclusive web experiences",
              rating: 4.7,
            },
            {
              title: "Web aaaaaaa Fundamentals",
              description: "Create inclusive web experiences",
              rating: 4.7,
            },
            {
              title: "aaaaaa Accessibility Fundamentals",
              description: "Create inclusive web experiences",
              rating: 4.7,
            },
            {
              title: "Web Accessibility aaaaaaaa",
              description: "Create inclusive web experiences",
              rating: 4.7,
            },
        ],

}

// Después de un inicio de sesión exitoso
function saveUserData(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

// Para recuperar los datos del usuario
function getUserData() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

// Para actualizar state.user
function updateStateUser() {
  state.user = getUserData();
}

// Llama a esta función cuando la aplicación se inicie
