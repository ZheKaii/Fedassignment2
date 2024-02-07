// Setting up the variables

const _question = document.getElementById('question');
const _options = document.querySelector('.options');
const _correctScore = document.getElementById('totalscore');
const _totalQuestion = document.getElementById('totalquestion');
const _checkBtn = document.getElementById('submit');
const _playAgainBtn = document.getElementById('playagain');
const _result = document.getElementById('result');
const questionCounterText = document.getElementById('questionCounter');
const savescore = document.getElementById('savescore');
const username = document.getElementById('username');

// Setting up the variables

// Making of the quiz

let correctAnswer = "", correctScore = 0, askedCount = 1, totalQuestion = 10, countingtenquestion = 11;
questionCounterText.innerText = askedCount + "/" + totalQuestion;

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

// Loading of the question

async function loadQuestion() {
    const APIurl = 'https://opentdb.com/api.php?amount=10&category=21&type=multiple';
    const result = await fetch(APIurl);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

// Showing the question

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

// Selecting the options

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

// Checking the answer

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

// Checking the number of questions

function checkCount() {
    askedCount++;
    setCount();
    questionCounterText.innerText = askedCount + "/" + totalQuestion;
    if (askedCount == countingtenquestion) {
        setTimeout(() => {
            console.log("");
        }, 5000);
        _result.innerHTML = `<p> Your score is ${correctScore}. </p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
        savescore.style.display = "block";
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

// Reset the quiz

function restartQuiz() {
    correctScore = 0, askedCount = 1;
    questionCounterText.innerText = askedCount + "/" + totalQuestion;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    savescore.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}

// Making the lottie in the quiz

var animation = bodymovin.loadAnimation({
    container: document.getElementById('animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/94c19622-0c82-4f94-b52c-7d87f4c51adf/Y1rFiailTo.json'
});

window.onload = function() {
    setTimeout(function() {
        document.getElementById('animation').style.display = 'none';
    }, 500);
}

// Making the lottie in the quiz