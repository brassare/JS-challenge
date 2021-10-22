const quizData = [
  {
    question: 'Qual a melhor linguagem de programação?',
    a: 'Java',
    b: 'Python',
    c: 'C',
    d: 'JavaScript',
    correct: 'd',
    isCorrect: false,
  },
  {
    question: 'Pra qual país o Chandler foge da Jacine?',
    a: 'Brasil',
    b: 'Grecia',
    c: 'Iemen',
    d: 'Russia',
    correct: 'c',
    isCorrect: false,
  },
  {
    question: 'Qual melhor personagem do Demon Slayer?',
    a: 'Tanjiro',
    b: 'Nezuko',
    c: 'Rengoku',
    d: 'Zenitsu',
    correct: 'c',
    isCorrect: false,
  },
  {
    question: 'De quem é a famosa frase “Penso, logo existo”?',
    a: 'Platão',
    b: 'Galileu Galilei',
    c: 'Descartes',
    d: 'Sócrates',
    correct: 'c',
    isCorrect: false,
  },
];

const quizEl = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');
const backButton = document.getElementById('backButton');

let currentQuizQuestion = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswer();
  displayBackButton();
  
  const currentQuizData = quizData[currentQuizQuestion]

  questionEl.innerHTML = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  })
}

function getAnswer() {
  let answer;

  answerEls.forEach((answerEl) => {
    if(answerEl.checked) {
      answer = answerEl.id
    }
  })

  return answer
}

function getPoints() {
  let points = 0
  
  quizData.forEach(q => {
    if (q.isCorrect) {
      points++
    }
  })

  return points;
}

function displayBackButton() {
  if(currentQuizQuestion !== 0) {
    backButton.style.display = 'block';
  } else {
    backButton.style.display = 'none';
  }
}

submitButton.addEventListener("click", () => {
  const answer = getAnswer();

  if(answer) {
    quizData[currentQuizQuestion].isCorrect = answer === quizData[currentQuizQuestion].correct

    currentQuizQuestion++

    const totalQuestions = quizData.length;
    if (currentQuizQuestion < totalQuestions) {
      loadQuiz();
    } else {
      quizEl.innerHTML = `
        <h2>Você acertou ${getPoints()} de ${totalQuestions} respostas</h2>

        <button onclick="location.reload()">Recomeçar</button>
      `
    }
  }
})

backButton.addEventListener("click", () => {
  currentQuizQuestion--;
  loadQuiz();
})