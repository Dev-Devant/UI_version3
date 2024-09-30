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
    validatedAndAbilitadedUser : false,
    isLogin: true,
    language: 'en',
    chatMessages: [],
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
/////////// starting logic

/*
if (localStorage.getItem('SessionKey')) {
    var currentKey = localStorage.getItem('SessionKey');
    checkSession(currentKey)
} 
*/


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


