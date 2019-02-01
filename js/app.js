var selectedOption;
var nextButton;
var backButton;
var question;
var questions = [];
var type;
var correctAnswer;
var incorrectAnswers = [];
var questionNumber = 0;
var correctChoice;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalQuestions = 0;
var json;
var setTheInterval;

nextButton = document.getElementById('next');
backButton = document.getElementById('back');

// checks if you got a correct answer
function checkWin() {
    // If selectedOption is in results[i].correct_answer 
    // Add one to total score
    // Else there's nothing
    console.log('in the checkWin function, the selectedOption is ', selectedOption,' the correct answer is ', correctAnswer);
    if (selectedOption === correctAnswer) {
        totalCorrect++;
        totalQuestions = totalCorrect + totalIncorrect;
    } else {
        totalIncorrect++;
        totalQuestions = totalCorrect + totalIncorrect;
    }
}

function timerReset() {
    time = 0;
    setTheInterval = setInterval(timer, 1000);
}

function timer() {
    time++;
    document.getElementById('timer').textContent = (time);
}

// runs once when the page loads, fetches data from API, and again when the next button is clicked
function pageLoad() {
    document.addEventListener('DOMContentLoaded', function(){
        // loading the questions and answer key from the API
        let APIurl = `https://opentdb.com/api.php?amount=15&difficulty=medium&type=multiple`;
        fetch(APIurl)
        .then( function(data) {
            return data.json();
        }).then(function(json) {
            var resultsArray = json.results
            resultsArray.forEach(function(result){
            questions.push(result);
            })
        updateContent();
        assignValues();   
        });
    })
}
pageLoad();

// picks which radio button will randomly be correct, assigns values to all radio buttons, updates the DOM
function assignValues() {
    // let's pick a random radio button as your correct answer
    var random = Math.floor(Math.random() * 4);
    document.querySelector('h2').textContent = (question);
    document.getElementById('score').textContent = (totalCorrect);
    document.getElementById('totalquestions').textContent = (totalQuestions);
    // assigning correctChoice and Correct label to html elements based on an id from the random number
    correctChoice = document.getElementById(random).children[0];
    correctLabel = document.getElementById(random).children[1];
    // updating the value of the correct choice with the answer from the API
    correctChoice.value = correctAnswer;
    // updating the label of the correct choice with the answer from the API
    correctLabel.textContent=`${correctAnswer}`
    // Now we need to assign incorrect values to the other radio buttons
    let incorrectRadioButtons = [0, 1, 2, 3];
    incorrectRadioButtons.splice(random, 1);
    for (let i = 0; i < incorrectRadioButtons.length; i++) {
        // assigning incorrectChoice and incorrect label to html elements
        let incorrectChoice = document.getElementById(incorrectRadioButtons[i]).children[0]
        let incorrectLabel = document.getElementById(incorrectRadioButtons[i]).children[1]
        // updating the value of the radio buttons and the label with the incorrect answer
        incorrectChoice.value = incorrectAnswers[i];
        incorrectLabel.textContent=`${incorrectAnswers[i]}`
    }
    clearInterval(setTheInterval);
    timerReset();
}

// pull which option selected from document
function pullSelectedOption() {
    selectedOption = document.forms[0].options.value;
}
pullSelectedOption();

// upadates content to the next one of the loaded API
function updateContent() {
    question = questions[questionNumber].question;
    type = questions[questionNumber].type;
    correctAnswer = questions[questionNumber].correct_answer;
    incorrectAnswers = questions[questionNumber].incorrect_answers; 
    questionNumber++;
}

// all the events that happen when you click nexts, pulls the value you selected, checks if you won
// updates the next pages content
nextButton.addEventListener('click', function() {
    pullSelectedOption();
    checkWin();
    updateContent();
    assignValues();
})

// backButton.addEventListener('click', fucnio)