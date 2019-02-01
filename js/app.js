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
var totalScore = 0;
var json;

nextButton = document.getElementById('next');
backButton = document.getElementById('back');


function checkWin() {
    // If selectedOption is in results[i].correct_answer 
    // Add one to total score
    // Else there's nothing\
    console.log('in the checkWin function, the selectedOption is ', selectedOption,' the correct answer is ', correctAnswer);
    if (selectedOption === correctAnswer) {
    totalScore = totalScore + 1;
    }
}

//
function pageLoad() {
    document.addEventListener('DOMContentLoaded', function(){
            // loading the questions and answer key from the API
            let APIurl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;
            fetch(APIurl)
                .then( function(data) {
                    return data.json();
                }).then(function(json) {
                    var resultsArray = json.results
                    resultsArray.forEach(function(result){
                        questions.push(result);
                    })
                updateContent();
                runTest();   
                });
    })
}
pageLoad();

function runTest() {
    // let's pick a random radio button as your correct answer
    var random = Math.floor(Math.random() * 4);
    document.querySelector('h2').textContent = (question);
    document.getElementById('score').textContent = (totalScore);
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
}

// pull which option selected from document
selectedOption = document.forms[0].options.value;

function updateContent() {
    question = questions[questionNumber].question;
    type = questions[questionNumber].type;
    correctAnswer = questions[questionNumber].correct_answer;
    incorrectAnswers = questions[questionNumber].incorrect_answers; 
    questionNumber++
}

nextButton.addEventListener('click', function() {
    selectedOption = document.forms[0].options.value;
    checkWin();
    updateContent();
    runTest();
})















































//                 .then(function(json) {
//                     json.results.forEach
//                     // console.log(json.data.childre[0].data.url)
//                     question = json.results[questionNumber].question;
//                     type = json.results[questionNumber].type;
//                     correctAnswer = json.results[questionNumber].correct_answer;
//                     incorrectAnswers = json.results[questionNumber].incorrect_answers;
//                     questionNumber++;

//                 })
//                 .then(function() {
//                     // let's pick a random radio button as your correct answer
//                     var random = Math.floor(Math.random() * 4);
//                     document.querySelector('h2').textContent = (question);
//                     // assigning correctChoice and Correct label to html elements based on an id from the random number
//                     correctChoice = document.getElementById(random).children[0];
//                     correctLabel = document.getElementById(random).children[1];
//                     // updating the value of the correct choice with the answer from the API
//                     correctChoice.value = correctAnswer;
//                     // updating the label of the correct choice with the answer from the API
//                     correctLabel.textContent=`${correctAnswer}`
//                     // Now we need to assign incorrect values to the other radio buttons
//                     let incorrectRadioButtons = [0, 1, 2, 3];
//                     incorrectRadioButtons.splice(random, 1);
//                     for (let i = 0; i < incorrectRadioButtons.length; i++) {
//                         // assigning incorrectChoice and incorrect label to html elements
//                         let incorrectChoice = document.getElementById(incorrectRadioButtons[i]).children[0]
//                         let incorrectLabel = document.getElementById(incorrectRadioButtons[i]).children[1]
//                         // updating the value of the radio buttons and the label with the incorrect answer
//                         incorrectChoice.value = incorrectAnswers[i];
//                         incorrectLabel.textContent=`${incorrectAnswers[i]}`
//                 } 
//             })
//     })
// }
// pageLoad();



// document.addEventListener('DOMContentLoaded', function(){
//     nextButton.addEventListener('click', function() {
//         checkWin();
//         pageLoad();
//         // // loading the questions and answer key from the API
//         // let APIurl = `https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple`;
//         // fetch(APIurl)
//         //     .then(function(data) {
//         //         return data.json();
//         //     })
//         //     .then(function(json) {
//         //         // console.log(json.data.childre[0].data.url)
//         //         question = json.results[questionNumber].question;
//         //         type = json.results[questionNumber].type;
//         //         correctAnswer = json.results[questionNumber].correct_answer;
//         //         incorrectAnswers = json.results[questionNumber].incorrect_answers;
//         //         questionNumber++;
//         //             console.log("The question is ", question);
//         //             console.log("question type is ", type);
//         //             console.log("correct answer is ", correctAnswer);
//         //             console.log('incorrect answers are ', incorrectAnswers);
//         //     })
//         //     .then(function() {
//         //         // let's pick a random radio button as your correct answer
//         //         var random = Math.floor(Math.random() * 4);
//         //         console.log("Random number is ", random);
//         //         document.querySelector('h2').textContent = (question);
//         //         document.getElementById('score').textContent = (totalScore);
//         //         // assigning correctChoice and Correct label to html elements based on an id from the random number
//         //         correctChoice = document.getElementById(random).children[0];
//         //         correctLabel = document.getElementById(random).children[1];
//         //             console.log('the correct label is ', correctLabel);
//         //             console.log("Correct choice is radio button ", correctChoice);
//         //         // updating the value of the correct choice with the answer from the API
//         //         correctChoice.value = correctAnswer;
//         //         // updating the label of the correct choice with the answer from the API
//         //         correctLabel.textContent=`${correctAnswer}`
//         //             console.log("Correct choice value is ", correctChoice.value);
//         //         // Now we need to assign incorrect values to the other radio buttons
//         //         let incorrectRadioButtons = [0, 1, 2, 3];
//         //         incorrectRadioButtons.splice(random, 1);
//         //             console.log("Incorrect radio buttons are ", incorrectRadioButtons);

//         //         for (let i = 0; i < incorrectRadioButtons.length; i++) {
//         //             // assigning incorrectChoice and incorrect label to html elements
//         //             let incorrectChoice = document.getElementById(incorrectRadioButtons[i]).children[0]
//         //             let incorrectLabel = document.getElementById(incorrectRadioButtons[i]).children[1]
//         //             // updating the value of the radio buttons and the label with the incorrect answer
//         //             incorrectChoice.value = incorrectAnswers[i];
//         //             incorrectLabel.textContent=`${incorrectAnswers[i]}`
//         //                 console.log('and incorrect radio button is ', incorrectChoice);
//         //         }
//         //         // pull which option selected from document
//         //         selectedOption = document.forms[0].options.value;
//         //         console.log('button user selected says ', selectedOption);
//                 // function checkWin() {
//                 //     // If selectedOption is in results[i].correct_answer 
//                 //     // Add one to total score
//                 //     // Else there's nothing\
//                 //     console.log('in the checkWin function, the selectedOption is ', selectedOption,' the correct answer is ', correctAnswer);
//                 //     if (selectedOption === correctAnswer) {
//                 //     totalScore = totalScore + 1;
//                 //     console.log('total score is ', totalScore);
//                 //     } else {
//                 //         console.log('the correctAnswer and selectedOption do not match')
//                 //     }
//                 // }
//                 // checkWin();
                
//             })
//     })
// // })