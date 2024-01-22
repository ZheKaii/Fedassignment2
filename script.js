//https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

const _question = document.getElementById('question');
const _options = document.querySelector('.options');
const _correctScore = document.getElementById('totalscore');
const _totalQuestion = document.getElementById('totalquestion');
const _checkBtn = document.getElementById('submit');
const _playAgainBtn = document.getElementById('playagain');
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

function eventListener() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListener();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

async function loadQuestion() {
    const APIurl = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
    const result = await fetch(`${APIurl}`);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    _question.innerHTML = `${data.question} <br> <span class="category">${data.category} </span>`;
    _options.innerHTML = `${optionsList.map((option, index) => ` <li> ${index + 1}. <span> ${option}</span> </li>`).join('')}`;
    selectOptions();
}

function selectOptions() {
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if (_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer() {
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if (selectedAnswer.trim() == HTMLDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p> <i class="fas fa-check"></i>Correct Answer! </p>`;
        }
        else {
            _result.innerHTML = `<p> <i class="fas fa-times"></i>Incorrect Answer! </p> <p><small><b>Correct Answer: </b> ${correctAnswer}</small></p>`;
        }
        checkCount();
    }
    else {
        _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option! </p>`;
        _checkBtn.disabled = false;
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestion) {
        setTimeout(() => {
            console.log("");
        }, 5000);
        _result.innerHTML = `<p> Your score is ${correctScore}. </p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    }
    else {
        setTimeout(() => {
            loadQuestion();
        }, 300);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}