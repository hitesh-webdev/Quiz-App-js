const questions = [
    {
        question: "What usually breaks first in a developer’s life?",
        answers:[
            {text: "Keyboard", correct: false},
            {text: "Laptop", correct: false},
            {text: "Internet", correct: false},
            {text: "Sleep schedule", correct: true},
        ]
    },
    {
         question: "What does “It works on my machine” actually mean?",
        answers:[
            {text: "Code is perfect", correct: false},
            {text: "I have no idea why it works", correct: true},
            {text: "User is wrong", correct: false},
            {text: "Server is wrong", correct: false},
        ] 
    },
    {
        question: "Why does a bug disappear when you show it to someone?",
        answers:[
            {text: "Murphy’s Law", correct: true},
            {text: "Compiler shame", correct: false},
            {text: "Computer fear", correct: false},
            {text: "Magic", correct: false},
        ]
    },
    {
         question: "What is a developer most afraid of?",
        answers:[
            {text: "Dark room", correct: false},
            {text: "Dead battery", correct: false},
            {text: "Can you fix this in 5 minutes?", correct: true},
            {text: "Slow internet", correct: false},
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
        button.addEventListener("click", selectAnswer)
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
    const iscorrect = selectedBtn.dataset.correct === "true"
    if (iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true ;
    })
    nextButton.style.display = "block"

}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
    showQuestion()
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