const questions = [
    {
        question: 'What is the capital city of India?',
        answers: [
            { text: 'Gandhinagar', correct: false},
            { text: 'Delhi', correct: true},
            { text: 'Mumbai', correct: false},
            { text: 'Surat', correct: false},
        ]
    },
    {
        question: 'What is the capital city of Thailand?',
        answers: [
            { text: 'Lampang', correct: false},
            { text: 'Phuket', correct: false},
            { text: 'Ayutthaya', correct: false},
            { text: 'Bangkok', correct: true},
        ]
    },
    {
        question: 'What is the capital city of Canada?',
        answers: [
            { text: 'Toronto', correct: false},
            { text: 'Ottawa', correct: true},
            { text: 'Santiago', correct: false},
            { text: 'Vancouver', correct: false},
        ]
    },
    {
        question: 'What is the capital city of Indonesia?',
        answers: [
            { text: 'Budapest', correct: false},
            { text: 'Kingston', correct: false},
            { text: 'Jakarta', correct: true},
            { text: 'Tokyo', correct: false},
        ]
    },
    {
        question: 'What is the capital city of Spain?',
        answers: [
            { text: 'Madrid', correct: true},
            { text: 'Port of Spain', correct: false},
            { text: 'Tunis', correct: false},
            { text: 'Kampala', correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML  = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();