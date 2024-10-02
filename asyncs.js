const server = "https://artekaimogo-production.up.railway.app"

// Función para realizar una solicitud POST
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  return await response.json(); 
}
// Función para realizar una solicitud GET

async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    // Maneja el caso cuando la respuesta no es exitosa
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Función para realizar login
async function login(username, password) {
  const url = server +"/api/login"; 
  const data = { username, password }; 

  try {
    const response = await postData(url, data);
    if (response.Email) {
      localStorage.setItem('SessionKey', response.SessionKey)
      state.isLoggedIn = true;
        state.user = {
          name: response.UserName,
          email: `${response.Email}`,
          tokens: response.Tokens,
          avatar: "Avatar.png?height=32&width=32",
          language: state.language,
          country: "United States",
          voice: "voice1",
        };
        if(response.Level > 0){
          state.validatedAndAbilitadedUser = true
        }

        saveUserData(state.user)
        window.location.href = "../mainScreen.html";

      return true    
    } else {
      console.log("Error en la respuesta del servidor:", response.error);
      return false
    }
  } catch (error) {
    console.error("Error al realizar la solicitud (login):", error);
    return false
  }
}


// Función para realizar registro
async function register(username, password,newsletter) {
  const url = server+"/api/register";
  const data = { username, password ,newsletter}; 
  try {
    const response = await postData(url, data);
    if (response.message) {  
      localStorage.setItem('SessionKey', response.SessionKey)
      state.isLoggedIn = true;
      state.user = {
          name: response.UserName,
          email: response.Email,
          tokens: response.Tokens,
          avatar: 'Avatar.png?height=32&width=32',
          language: state.language,
          country: 'United States',
          voice: 'voice1',
          newsletterSubscribed: newsletter
      };
      saveUserData(state.user)
      window.location.href = "../mainScreen.html";
      return true
    }

  } catch (error) {
    console.error("Error al realizar la solicitud (register):", error);
  }
  return false
}


async function checkSession(SessionKey) {
  const url = server+"/api/session"; 
  const data = { SessionKey };

  try {
    const response = await postData(url, data);
    if (response.SessionKey) {
      state.isLogin = true;
      state.user = {
          name: response.UserName,
          email: response.Email,
          tokens: response.Tokens,
          avatar: 'Avatar.png?height=32&width=32',
          language: state.language,
          country: 'Argentina',
          voice: 'voice1'
      };
      if(response.Level > 0){
        state.validatedAndAbilitadedUser = true
      }
      saveUserData(state.user)

      return true
    } else {
       console.log("Error en la respuesta del servidor:", response.error);
      return false
    }
  } catch (error) {
    console.error("Error al realizar la solicitud (sessioncheck):", error);
    return false
  }
}

// Función para enviar un chat
async function chatter(Chat) {
  const url = server+"/api/ChatRequest"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const data = { sessionKey, Chat }; 

  try {
      const response = await postData(url, data);
      if (response.message) {         
        addMessage(response.IAResp, 'IA')
        return true
      } else {
          console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
  return false
}

async function getCourses() {
  const url = server+"/api/ownCourses"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const data = { sessionKey }; 

  try {
      const response = await postData(url, data);
      if (response.message) {   
        
        const courseDataGet = response.courseList

        let dataMined = []
        courseDataGet.forEach(course => {
          var cnt  = 0
          for (var i = 0;i<course.enrroledDAta.temas.length;i++){
            if(course.enrroledDAta.temas[i]){
              cnt ++
            }else{break}

          }
          const progress = (cnt/course.enrroledDAta.temas.length)*100
            const dataLoad = {
              'id': course.ID,
              'title': course.title,        
              'tags': course.tags,         
              'description': course.description,
              'overview': course.overview,
              'content': course.content,
              'enroledData': course.enrroledDAta,
              'progress': progress,
              'score': 5,
              'state': 'Inprogress'
            }
            dataMined.push(dataLoad);
        });

        courses = dataMined
        renderizarCursos('Inprogress');

        return true

      } else {
        console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
  return false
}

async function updateCourseTraker(courseId,seen) {
  const url = server+"/api/courseEnrrolData"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const data = { sessionKey,courseId,seen }; 

  try {
      const response = await postData(url, data);
      if (response.message) {   
      
      } else {
        console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
}

async function reExplainRequest(textToReexplain) {
  const url = server+"/api/reExplain"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const data = { sessionKey, textToReexplain }; 

  try {
      const response = await postData(url, data);
      if (response.message) {         

        const format = formatMessage(response.IAResp.toString())
        const filter = removeFormatting(response.IAResp.toString())

        stopVoice()
        InterpreterVoice(filter)
        let ensambler = '<pre style="white-space: pre-wrap; word-wrap: break-word; overflow-x: auto; max-width: 100%;">' + format + '</pre>'
        state.chatMessages.push({ sender: 'Artek AI', message: ensambler});
        render()
        return false
      } else {
          console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
  return true
}

async function sendTask(solve) {
  const url = server+"/api/taskSubmit"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const task = slides[state.currentSlide].content
  const data = { sessionKey,task, solve }; 

  try {
      const response = await postData(url, data);
      if (response.message) {         
        const format = formatMessage(response.IAResp.toString())
        const filter = removeFormatting(response.IAResp.toString())
        InterpreterVoice(filter)
        state.chatMessages.push({ sender: 'Artek AI', message: format});
        if(response.past){
          slides[state.currentSlide].completed = true
          state.currentSlide += 1
          updateCourseTraker(state.currentCourseId)
          if(state.currentSlide >= slides.length){
            state.currentSlide = 0
            slides = []
            slides.push({
              Module: 'module',
              unit: '',   
              content: 'Has terminado! puedes ir a tu certificacion',
              color : '#07295f',
              task: false
            })
          }
        }
        render()
        return false
      } else {
          console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
  return true
}
async function RequestCreate(instructions) {
  const url = server+"/api/CreateCourseFromUser"; 
  const sessionKey = localStorage.getItem('SessionKey')
  const data = { sessionKey , instructions}; 

  try {
      const response = await postData(url, data);
      if (response.message) {    
        //searchingCourses()
        console.log("Funcionoooooo")
        state.user.tokens = response.tokens
        return true;
      } else {
        console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
      
  }
  return false
}

async function logOutSession(SessionKey) {
  const url = server+"/api/logout"; 
  const data = { SessionKey }; 

  try {
    const response = await postData(url, data);
    if (response.message) {
      location.reload(true);          
    } else {
       console.log("Error en la respuesta del servidor:", response.error);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud (sessioncheck):", error);
  }
}

async function resetPassrequest(email) {
  const url = server+"/api/resetPass"; 
  const data = {email}; 

  try {
      const response = await postData(url, data);
      if (response.message) {         
        console.log("verifica tu correo:", response.message);
      } else {
        console.log("Error en la respuesta del servidor:", response.error);
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
  }
}

async function changePassRequest(password,newPassword,checkPassword) {
  const url = server+"/api/changePass"; 
  const SessionKey = localStorage.getItem('SessionKey')
  const data = { SessionKey ,password,newPassword,checkPassword}; 
  try {
      const response = await postData(url, data);
      if (response.message) {   
        handleLogout()
        return true
      } else {
        console.log("Error en la respuesta del servidor:", response.error);
        return false
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
      return false
  }
}
async function changenameRequest(newName) {
  const url = server+"/api/changeName"; 
  const SessionKey = localStorage.getItem('SessionKey')
  const data = { SessionKey,newName}; 
  try {
      const response = await postData(url, data);
      if (response.message) { 
        
        state.user.name = newName
        handleLogout()
        return true
      } else {
        console.log("Error en la respuesta del servidor:", response.error);
        return false
      }
  } catch (error) {
      console.error("Error al realizar la solicitud :", error);
      return false
  }
}
// Función para obtener los pagos usando POST
async function getPayments() {
  const url = `${server}/mlPayments`; 
  const data = {}; 

  try {
    const response = await postData(url, data);
    if (Array.isArray(response)) {
      console.log('Pagos recibidos:', response);



    } else {
      console.error('La respuesta no es una lista de pagos:', response);
    }
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
  }
}

window.chatter = chatter;