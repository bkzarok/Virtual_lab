//TODO: Use login to check if the user has permission to add
//      a quiz to this course.

//Keeps track of the number of questions for display.
var questions = 0;

//Id of the course the quiz is being submitted for.
var course = "CS4450";

//Add form html for an additional question.
function addQuestion(){

    //Increments question number.
    questions++;

    //Gets the questions container element
    var container = document.getElementById('questions');

    //Creates a new node to work with appendChild.
    var newquestion = document.createElement('div');

    //A series of concatenations of html generated for new question field.
    var html = '<hr><div class="card>"><div class="question card-header"> Question ' + (questions+1) + '</div>'+
        '<div><label>Question :</label><input id="question' + questions + '" class="form-control" /></div>' +
        '<div><label>Correct answer: </label><input id="answer'+ questions + '_0" class="form-control" /></div>' +
        '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_1" class="form-control" /></div>' +
        '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_2" class="form-control" /></div>' +
        '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_3" class="form-control" /></div></div>';
    
    //Set the newquestion's innerHTML to the html string.aw
    newquestion.innerHTML(html);

    //appendChild used instead of innerHTML to prevent destruction of
    //information entered before pressing the Add Question button.
    container.appendChild(newquestion);
}

//Submits the quiz to the database.
function submitQuiz(){
    //Quiz data to send to database.
    var quiz = {
        //Title
        title: document.getElementById("quizNameInput").value,
        //Quiz array
        questions:[]
    }

    //TODO: Add answer explanation once explanations are implemented.
    //TODO: Only add questions that are completely filled in.

    //For each question input, generate data in the questions array.
    for(var i = 0; i <= questions; i++)
    {
        quiz.questions[i] = {question: document.getElementById("question" + i).value,
                answers: [
                    document.getElementById("answer" + i + "_0").value,
                    document.getElementById("answer" + i + "_1").value,
                    document.getElementById("answer" + i + "_2").value,
                    document.getElementById("answer" + i + "_3").value,
                ]
            };
    }
    //TODO: Create a confirmation message or redirect page to course quiz index.
    //Disables the submit button to prevent creating duplicate quizzes.
    document.getElementById("submit").disabled = true;


    //Api call that stores the quiz in the database.
    api.addQuiz(course, quiz);
}

//TODO: Add a function to remove questions.