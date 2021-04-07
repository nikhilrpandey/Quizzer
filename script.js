let url = `https://opentdb.com/api.php?amount=10&`;
// let question  = document.querySelector('.quiz-question');
// let options  = document.querySelectorAll('.options');
let page = document.querySelector('main');
let count = 0;
let score = 0;
let optionsArr = [];
// Selecting all the buttons and adding event listener to them

let startQuiz = document.querySelectorAll('.button');

// Adding event listener to all the quiz tabs
startQuiz.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        
        fetchQuiz(ele.getAttribute('type'));
        // loadQuiz();
        // Opens the quiz interface in the same tab
    })
})

// The function fetches the quiz by an API call to openDB
function fetchQuiz(quizCode) {
    let endpoint = url+`category=${quizCode}&type=multiple`;
    let xhr = new XMLHttpRequest();
    xhr.responseType='json';
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            let varJSON = xhr.response.results;
            loadQuiz(varJSON);
        }
    }
    xhr.open('GET',endpoint,true);
    xhr.send();
};



// This changes the page's data to the quiz interface
function loadQuiz(varJSON) {
    let quizInterface = 
    `<div class="quiz-box">
        <div class='question-container'>
            <h3 class="quiz-question"></h3>    
            <ul class="quiz-options">
                <input type='radio' class='choose' name='answer' id='0'>
                <label for='0'><li class="options" id='optiona'></li></label>  <br>
                <input type='radio' class='choose' name='answer' id='1'>
                <label for='1'><li class="options" id='optionb'></li></label> <br>
                <input type='radio' class='choose' name='answer' id='2'>
                <label for='2'><li class="options" id='optionc'></li></label> <br>
                <input type='radio' class='choose' name='answer' id='3'>
                <label for='3'><li class="options" id='optiond'></li></label>
            </ul>
        </div>
        <div class="button" id='next-question'>
            Submit
        </div>
    </div>`

    page.innerHTML=quizInterface;
    let nextButton = document.getElementById('next-question');
    changeQuestion(nextButton,varJSON);
}

// This function renders the quiz on to the quiz interface loaded by loadQuiz  function.
function renderQuiz(quizQuestions) { //count is for the question number

    console.log(quizQuestions);
    let question  = document.querySelector('.quiz-question');
    let options  = document.querySelectorAll('.options');
    question.innerHTML=quizQuestions[count].question;
    // let optionsArr=[];
    optionsArr.splice(0, optionsArr.length)
    optionsArr.push(Math.floor(Math.random()*4));
    while(optionsArr.length<4){
        let rand = Math.floor(Math.random()*4);
        if(optionsArr.includes(rand)===false){
            optionsArr.push(rand);
        }
    }
    console.log('I am inside reder quiz >>> question number: ',optionsArr,count);
    // let optiona = document.getElementById('optiona')        
    // let optionb = document.getElementById('optionb')
    // let optionc = document.getElementById('optionc')
    // let optiond = document.getElementById('optiond')
    options[optionsArr[0]].innerHTML=quizQuestions[count].correct_answer
    options[optionsArr[1]].innerHTML=quizQuestions[count].incorrect_answers[0];
    options[optionsArr[2]].innerHTML=quizQuestions[count].incorrect_answers[1];
    options[optionsArr[3]].innerHTML=quizQuestions[count].incorrect_answers[2];
}

//  This function checks the answer whenever we change the question
function checkAnswers() {
    console.log('I am inside check aswers >>> question number: ',optionsArr,count);
    let selectedOptions =  document.querySelectorAll('.choose');
    selectedOptions.forEach((e)=>{
        if(e.checked){
            if(e.getAttribute('id')==optionsArr[0])
                score++;
            console.log(e.getAttribute('id'));
            console.log(optionsArr[0]);
        }
        console.log('score=',score);
    })
}


// This function clears the user choice whenever we go to next question.
function clearOptions() {
    let selectedOptions =  document.querySelectorAll('.choose');
    selectedOptions.forEach((e)=>{
        e.checked=0;
    })
}

function showResult() {
    let resultContainer = document.querySelector('.quiz-box');
    let result = 
    `
        <div class='result'>
            <h3> Your Score is ${score}</h3>
        </div>
    `
    resultContainer.innerHTML=result;
}




// This is executed everytime when the submit button is pressed.
function changeQuestion(nextButton,varJSON) {
    renderQuiz(varJSON);
    nextButton.addEventListener('click',()=>{
        checkAnswers();
        clearOptions();
        if(count<9){
            count++;
            renderQuiz(varJSON);
        }
        else{
            showResult();
            alert("You have finished the quiz");
            console.log('Your score is: ',score);
        }
    })
}