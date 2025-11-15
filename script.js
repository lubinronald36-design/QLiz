let currentQuestion = 0;
let score = 0;
let timer = 600; // 10 minutes in seconds
let intervalId;

const questions = [
  // Add your questions here
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Uranus"],
    answer: 2
  }
  // Add more questions...
];

function generateQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question").innerHTML = question.question;
  const options = document.getElementById("options");
  options.innerHTML = "";
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerHTML = <input type="radio" name="option" value="${index}"> ${option};
    options.appendChild(li);
  });
}

function nextQuestion() {
  try {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }
    const answer = questions[currentQuestion].answer;
    if (parseInt(selectedOption.value) === answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      generateQuestion();
      if (currentQuestion === questions.length - 1) {
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("submit-btn").style.display = "block";
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function submitQuiz() {
  clearInterval(intervalId);
  hideQuizElements();
  document.getElementById("result").innerHTML = Your score is ${score} out of ${questions.length};
}

function startTimer() {
  intervalId = setInterval(() => {
    timer--;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById("timer").innerHTML = ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
    if (timer === 0) {
      submitQuiz();
    }
  }, 1000);
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  timer = 600;
  document.getElementById("question").style.display = "block";
  document.getElementById("options").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "block";
  document.getElementById("result").innerHTML = "";
  generateQuestion();
  startTimer();
}

function hideQuizElements() {
  document.getElementById("question").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "none";
}

document.getElementById("retake-btn").addEventListener("click", () => location.reload());
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("submit-btn").addEventListener("click", submitQuiz);
startQuiz();
