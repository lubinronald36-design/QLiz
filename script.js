const questions = [...]; // your questions array

let currentQuestion = 0;
let score = 0;
let timer = 600; // 10 minutes in seconds

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
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
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
  } else {
    alert("Please select an option!");
  }
}

function submitQuiz() {
  document.getElementById("question").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("result").innerHTML = Your score is ${score} out of ${questions.length};
}

function startTimer() {
  setInterval(() => {
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
  timer = 600; // Reset timer to 10 minutes
  document.getElementById("question").style.display = "block";
  document.getElementById("options").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "block";
  document.getElementById("result").innerHTML = "";
  generateQuestion();
  startTimer();
}
document.getElementById("retake-btn").addEventListener("click", function() {
  // Reset quiz logic here, e.g., reload page or reset variables
  location.reload(); // Simple way to reload the page and restart
});document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("submit-btn").addEventListener("click", submitQuiz);
startQuiz();
