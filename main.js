const appVersion = 'Closed Beta 1.4.3 : Si algo falla, por favor reiniciar y reportar el bug. Agradecemos cualquier comentario y sugerencia'

let subscriptionOptions = [
    { id: 1, name: 'Basic', 
      price: 5.99, 
      tokens: 3,
      preferenceId: '316205094-246ab804-ab87-4639-9b2a-d6395a7f7a1a',
      features: [
        '3 cursos',
        'Ideal para dar tus primeros pasos'
      ]},
    { id: 2, name: 'Standard', 
      price: 12.99, 
      tokens: 8,
      preferenceId: '316205094-37f6b78c-e1db-45f5-ba85-69324e5028a2',
      features: [
        '8 cursos', 
        'Ideal para soporte academico'
      ] },
    { id: 3, name: 'Premium', 
      price: 19.99, 
      tokens: 15,
      preferenceId: '316205094-dd86d71a-a2ba-4a9b-96d2-eb8b38553175',
      features: [
        '15 cursos', 
        'Para una formacion completa'
      ] },
    { id: 4, name: 'Ultimate (Subscripcion)', 
      price: 29.99, 
      preferenceId: '316205094-246ab804-ab87-4639-9b2a-d6395a7f7a1a',
      tokens: 'inf',
      features: [
        'Subscripcion mensual (Cancela cuando quieras!)', 
        'Cursos ilimitados!', 
        'Conferencias virtuales incluidas', 
        'Foro de soporte'
      ] },
    { id: 5, name: 'Enterprise (Subscripcion)', 
      price: 'Contactar con ventas', 
      tokens: 'inf',
      features: [
        'Formaciones para equipos de trabajo y empresas', 
        'seguimiento y control de grupos y conocmiento adquiridos', 
        'diseño de curriculas asistido'
      ] }
];

const subscriptionOptionsWithTax = subscriptionOptions.map(option => {
  if (typeof option.price === 'number') {
      const tax = option.price * 0.6; 
      const ecomerce = 1.16
      const totalPrice = (option.price + tax) * ecomerce; 
      const ars = totalPrice * 1600
      return {
          ...option,
          totalPrice: totalPrice.toFixed(2),
          ...option,
          totalARS: ars.toFixed(2) 
      };
  }
  else{
    return {
      ...option,
      totalPrice: '?',
      ...option,
      totalARS: '?' 
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
