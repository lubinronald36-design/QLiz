const questions = [
  // Beginner questions
  { question: "What does CPU stand for?", options: ["Central Power Unit", "Central Processing Unit", "Computer Processing Unit", "Central Performance Unit"], answer: 1 },
  { question: "What is the primary function of RAM?", options: ["Storage", "Processing", "Input/Output", "Memory"], answer: 3 },
  { question: "What is a byte?", options: ["A unit of measurement", "A type of computer virus", "A type of software", "A group of 8 bits"], answer: 3 },
  { question: "What is a motherboard?", options: ["A type of software", "A type of hardware", "The main circuit board of a computer", "A type of peripheral device"], answer: 2 },
  { question: "What is a browser?", options: ["A type of software", "A type of hardware", "A program that allows users to access the internet", "A type of virus"], answer: 2 },
  { question: "What is a network?", options: ["A group of computers connected together", "A type of software", "A type of hardware", "A type of virus"], answer: 0 },
  { question: "What is a server?", options: ["A type of software", "A type of hardware", "A computer that provides services to other computers", "A type of peripheral device"], answer: 2 },
  // Intermediate questions
  { question: "What is the difference between HTTP and HTTPS?", options: ["HTTP is secure, HTTPS is not", "HTTPS is secure, HTTP is not", "HTTP is faster, HTTPS is slower", "HTTPS is faster, HTTP is slower"], answer: 1 },
  { question: "What is a firewall?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A system that controls incoming and outgoing network traffic", "A type of virus"], answer: 2 },
  { question: "What is a VPN?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A virtual private network that encrypts internet traffic", "A type of virus"], answer: 2 },
  { question: "What is a database?", options: ["A collection of data organized in a way that allows for efficient retrieval", "A type of software that protects against viruses", "A type of hardware that protects against viruses", "A type of virus"], answer: 0 },
  { question: "What is SQL?", options: ["A programming language", "A type of software that protects against viruses", "A type of hardware that protects against viruses", "A language used to manage relational databases"], answer: 3 },
  { question: "What is a cookie?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A small piece of data stored on a user's device", "A type of virus"], answer: 2 },
  { question: "What is a cache?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A small, fast memory location that stores frequently accessed data", "A type of virus"], answer: 2 },
  // Advanced questions
  { question: "What is the difference between monolithic and microkernel architectures?", options: ["Monolithic kernels are more secure, microkernels are not", "Microkernels are more secure, monolithic kernels are not", "Monolithic kernels are larger and more complex, microkernels are smaller and more modular", "Microkernels are larger and more complex, monolithic kernels are smaller and more modular"], answer: 2 },
  { question: "What is a deadlock?", options: ["A situation where two or more processes are blocked indefinitely", "A type of software that protects against viruses", "A type of hardware that protects against viruses", "A type of virus"], answer: 0 },
  { question: "What is a semaphore?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A variable or data structure that provides a simple way to control access to a shared resource", "A type of virus"], answer: 2 },
  { question: "What is a thread?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A separate flow of execution in a program", "A type of virus"], answer: 2 },
  { question: "What is a process?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A program in execution", "A type of virus"], answer: 2 },
  { question: "What is virtualization?", options: ["A type of software that protects against viruses", "A type of hardware that protects against viruses", "A technology that allows multiple operating systems to run on a single physical machine", "A type of virus"], answer: 2 }
];

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
    li.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
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
    } else {
      document.getElementById("next-btn").style.display = "none";
      document.getElementById("submit-btn").style.display = "block";
    }
  }
}

function submitQuiz() {
  document.getElementById("question").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("result").innerHTML = `Your score is ${score} out of ${questions.length}`;
}

function startTimer() {
  setInterval(() => {
    timer--;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById("timer").innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timer === 0) {
      submitQuiz();
    }
  }, 1000);
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("submit-btn").addEventListener("click", submitQuiz);

generateQuestion();
startTimer();
