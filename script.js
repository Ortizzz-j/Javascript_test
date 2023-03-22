var timeLeftEl = document.querySelector('#timeLeft');
var headingEl = document.querySelector('#heading');
var contentEl = document.querySelector('#content');
var startBtnEl = document.querySelector('#start');
var timerEl;
var scoreEl = document.querySelector('#currentScore');


var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var timeLeft = 75;
var indexOfCurrentQuestion = 0;
var currentScore = 0;
var timer;

function renderNextQuestion() {
  contentEl.innerHTML = '';
  var currentQuestion = questions[indexOfCurrentQuestion]; // the questions index that is picked is equal to the number that indexOfCurrentQuestion equals. Default is the first index in our questions var which would have the index of zero.

  headingEl.textContent = currentQuestion.title;

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var buttonEl = document.createElement('button'); // ===== making a <button></button> in the html
    buttonEl.setAttribute('class', 'choice'); // ===== setting a class = "choice" in the above element
    buttonEl.textContent = currentQuestion.choices[i];
    contentEl.appendChild(buttonEl); // this adds the new button element created into the content ID in the html.
  }
  // indexOfCurrentQuestion++;
};

startBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  startBtnEl.remove();
  timer = setInterval(function () {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    scoreEl.textContent = currentScore;


  }, 1000)


  renderNextQuestion();
});



contentEl.addEventListener('click', function (event) {
  var currentQuestion = questions[indexOfCurrentQuestion];
  event.preventDefault();
  // if(event.target.matches('.choice')){
  //     renderNextQuestion();
  // }
  console.log('index', indexOfCurrentQuestion);
  if (event.target.textContent === currentQuestion.answer && indexOfCurrentQuestion < 5) {
    currentScore++;
    // scoreEl.textContent = currentScore;
  } else {
    timeLeft = timeLeft - 10;
    timeLeftEl.textContent = timeLeft;
  }
  indexOfCurrentQuestion++;
  if (timeLeft === 0 || indexOfCurrentQuestion === questions.length) {
    endQuiz();
    scoreEl.remove();
  } else {
    renderNextQuestion();
  }
});

const initialInput = document.createElement('input');
function endQuiz() {

  clearInterval(timer);
  contentEl.innerHTML = '';
  headingEl.textContent = 'Your Score: ' + currentScore;

  initialInput.type = 'text';
  scoreEl.appendChild(initialInput);
  const submitButton = document.createElement('button');
  submitButton.textContent = 'submit';
  scoreEl.appendChild(submitButton)
  submitButton.addEventListener('click', saveHighScore)
}

function saveHighScore() {
  var initials = initialInput.value.trim();
  var highScores =
    JSON.parse(window.localStorage.getItem('highscores')) || [];
  var newScore = {
    score: timeLeft,
    initials: initials,
  };
  highScores.push(newScore)
  console.log('score', newScore)
  window.localStorage.setItem('highscores', JSON.stringify(highScores));
}

// Needs some styling
// I still need the game to = to game over when l questions are answered or the timer runs out.
// I need to be able to save my initials and the score once game over.