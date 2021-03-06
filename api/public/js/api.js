/**
 * js/server.js
 * the client-sided api sdk/module. provides wrapper functions that call the existing api endpoints
 */

function request(url, method, body){
  if(typeof body !== 'string'){
    body = JSON.stringify(body);
  }
  return fetch(url, {
    method,
    headers: {
      'Accept'      : 'application/json, text/plain, */*', //to notify we want json (or text) data back as a response
      'Content-Type': 'application/json', //to specify the format of the extra data the client is sending, if anything
    },
    //mode: 'no-cors',
    body //data to send to server
  }).then(res => {
    if(res.ok){
      return res.json();
    } else {
      return res.json().then(v=>Promise.reject(v)).catch(v=>Promise.reject(v)); //promise rejection chaining to return a rejected promise.
    }
  });
}

//helper functions
function post(url, body){
  return request(url, 'POST', body);
}

function get(url){
  return request(url, 'GET');
}

function del(url){
  return request(url, 'DELETE');
}

var api = {};

api.post = post;
api.get = get;
api.del = del;

/*
 * ENDPOINTS
 * these should mirror those described in the server's api.js script
 */

api.getTest = (data) => {
  return get(`https://antibuddies-api.glitch.me/api/test/${data}`); 
}

api.signup = (user) => {
  return post(`https://antibuddies-api.glitch.me/api/signup`, user);
}

api.authenticate = (user) => {
  return post(`https://antibuddies-api.glitch.me/api/authenticate`, user);
}

api.deauthenticate = () => {
  return get(`https://antibuddies-api.glitch.me/api/deauthenticate`);
}

api.getUsers = () => {
  return get(`https://antibuddies-api.glitch.me/api/users`);
}

api.getUser = (user) => {
  return get(`https://antibuddies-api.glitch.me/api/users/${user}`);
}

api.deleteUser = (user) => {
  return del(`https://antibuddies-api.glitch.me/api/users/${user}`);
}

api.getCourses = () => {
  return get(`https://antibuddies-api.glitch.me/api/courses`);
}

api.addCourse = (course) => {
  return post(`https://antibuddies-api.glitch.me/api/courses`, course);
}

api.getCourse = (course) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}`);
}

api.getQuizzes = (course) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes`);
}

api.addQuiz = (course, quizData) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes`, quizData);
}

api.getQuiz = (course, quiz) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}`);
}

api.getQuizQuestions = (course, quiz) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/questions`);
}

api.getQuizQuestion = (course, quiz, questionIndex) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}

api.getQuizScores = (course) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizScores`);
}

api.addQuizQuestion = (course, quiz, questionData) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/addQuestion`, questionData);
}

api.checkAnswer = (course, quiz, questionIndex, choice) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}/checkAnswer`, choice);
}

api.deleteQuiz = (course, quiz) => {
  return del(`https://antibuddies-api.glitch.me/api/course/${course}/quizzes/${quiz}`);
}

api.deleteQuestion = (course, quiz, questionIndex) => {
  return del(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}`);
}

api.getPanels = (course) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/panels`);
}

api.getPanelByName = (course, panelName) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/panels/${panelName}`);
}

api.addPanel = (course, panelData) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/panels`, panelData);
};

api.postPanelScore = (course, panelName, scoreData) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/panels/${panelName}/score`, scoreData);
};

api.panelScore = (course, panelName) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/panels/${panelName}/score`);
}

api.getPanelDifficulty = (course, difficulty) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/panels/difficulty/${difficulty}`);
};

api.getQuizResponses = (course, data) => {
  
  let query = "";
  if(data.quiz && data.user){
    query = `?quiz=${data.quiz}&user=${data.user}`;
  } else if(data.quiz){
    query = `?quiz=${data.quiz}`;
  } else if(data.user){
    query = `?user=${data.user}`;
  }
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizResponses${query}`);
}

api.submitQuiz = (course, quizData) => {
  return post(`https://antibuddies-api.glitch.me/api/courses/${course}/quizResponses`, quizData);
}

api.getQuizUserResponseCount = (course, data) => {
  
  let query = "";
  if(data.quiz && data.user){
    query = `?quiz=${data.quiz}&user=${data.user}`;
  } else if(data.quiz){
    query = `?quiz=${data.quiz}`;
  } else if(data.user){
    query = `?user=${data.user}`;
  }
  
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizResponses/count${query}`);
}

api.getQuestionResponses = (course, quiz, questionIndex) => {
  return get(`https://antibuddies-api.glitch.me/api/courses/${course}/quizzes/${quiz}/questions/${questionIndex}/responses`);
}
