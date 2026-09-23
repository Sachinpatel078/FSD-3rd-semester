const questions = [
    {
        q: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        q: "Which language is used for styling webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 1
    },
    {
        q: "Which language makes webpages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        q: "Which is a backend technology?",
        options: ["Node.js", "HTML", "CSS", "Photoshop"],
        answer: 0
    },
    {
        q: "Which language is used for databases?",
        options: ["CSS", "HTML", "SQL", "XML"],
        answer: 2
    },
    {
        q: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Internet",
            "Application Process Input",
            "Advanced Program Interface"
        ],
        answer: 0
    },
    {
        q: "Which HTTP method is used to get data?",
        options: ["POST", "GET", "DELETE", "PUT"],
        answer: 1
    },
    {
        q: "Which is a JavaScript library?",
        options: ["MySQL", "React", "HTML", "CSS"],
        answer: 1
    },
    {
        q: "Which HTML tag creates a link?",
        options: ["<link>", "<a>", "<url>", "<href>"],
        answer: 1
    },
    {
        q: "Which symbol represents an ID in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    }
];

let current = 0;
let answers = Array(questions.length).fill(null);
let time = 1200;
let timerInterval;

function startQuiz() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let className = document.getElementById("className").value;

    if (name === "" || roll === "" || className === "") {
        alert("Please enter all student details.");
        return;
    }
    document.getElementById("startPage").classList.add("hide");
    document.getElementById("quizPage").classList.remove("hide");

    document.getElementById("welcome").innerText =
        "Student: " + name;

    createNumbers();
    showQuestion();
    startTimer();
}
function showQuestion() {
    let q = questions[current];
    document.getElementById("question").innerText =
        (current + 1) + ". " + q.q;
    document.getElementById("progress").innerText =
        "Question " + (current + 1) +
        " of " + questions.length;
    let percent =
        ((current + 1) / questions.length) * 100;
    document.getElementById("bar").style.width =
        percent + "%";

    let options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach(function(option, index) {

        let div = document.createElement("div");

        div.className = "option";

        if (answers[current] === index) {
            div.classList.add("selected");
        }

        div.innerHTML =
            `<input type="radio"
             name="answer"
             ${answers[current] === index ? "checked" : ""}>
             ${option}`;

        div.onclick = function() {
            answers[current] = index;
            showQuestion();
        };

        options.appendChild(div);
    });

    updateNumbers();
}

function createNumbers() {
    let numbers = document.getElementById("numbers");

    numbers.innerHTML = "";

    questions.forEach(function(_, index) {

        let button = document.createElement("span");

        button.className = "number";
        button.innerText = index + 1;

        button.onclick = function() {
            current = index;
            showQuestion();
        };

        numbers.appendChild(button);
    });
}

function updateNumbers() {
    let buttons =
        document.querySelectorAll(".number");

    buttons.forEach(function(button, index) {

        button.classList.remove("current");
        button.classList.remove("answered");

        if (index === current) {
            button.classList.add("current");
        }

        if (answers[index] !== null &&
            index !== current) {
            button.classList.add("answered");
        }
    });
}

function nextQuestion() {
    if (current < questions.length - 1) {
        current++;
        showQuestion();
    } else {
        submitQuiz();
    }
}
function previousQuestion() {
    if (current > 0) {
        current--;
        showQuestion();
    }
}

function clearAnswer() {
    answers[current] = null;
    showQuestion();
}

function startTimer() {

    timerInterval = setInterval(function() {

        time--;

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").innerText =
            "Time: " +
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time is over!");
            submitQuiz();
        }

    }, 1000);
}

function submitQuiz() {

    clearInterval(timerInterval);

    let correctCount = 0;

    questions.forEach(function(question, index) {

        if (answers[index] === question.answer) {
            correctCount++;
        }
    });

    let unansweredCount =
        answers.filter(function(answer) {
            return answer === null;
        }).length;

    let wrongCount =
        questions.length -
        correctCount -
        unansweredCount;

    let percentage =
        Math.round(
            (correctCount / questions.length) * 100
        );

    document.getElementById("quizPage")
        .classList.add("hide");

    document.getElementById("resultPage")
        .classList.remove("hide");

    document.getElementById("resultName").innerText =
        document.getElementById("name").value;

    document.getElementById("resultRoll").innerText =
        document.getElementById("roll").value;

    document.getElementById("resultClass").innerText =
        document.getElementById("className").value;

    document.getElementById("score").innerText =
        "Score: " + correctCount + "/" + questions.length;

    document.getElementById("percentage").innerText =
        percentage + "%";

    document.getElementById("correct").innerText =
        correctCount;

    document.getElementById("wrong").innerText =
        wrongCount;

    document.getElementById("unanswered").innerText =
        unansweredCount;

    if (percentage >= 80) {
        document.getElementById("message").innerText =
            "Excellent!";
    } else if (percentage >= 60) {
        document.getElementById("message").innerText =
            "Good Job!";
    } else {
        document.getElementById("message").innerText =
            "Keep Practicing!";
    }
}

function showReview() {

    let review = document.getElementById("review");

    review.innerHTML = "<h3>Answer Review</h3>";

    questions.forEach(function(question, index) {

        let userAnswer = answers[index];

        let userText = "Not Answered";

        if (userAnswer !== null) {
            userText = question.options[userAnswer];
        }

        let correctText =
            question.options[question.answer];

        let div = document.createElement("div");

        div.className = "review-item";

        div.innerHTML = `
            <b>Q${index + 1}. ${question.q}</b>
            <p>Your Answer: ${userText}</p>
            <p class="correctText">
                Correct Answer: ${correctText}
            </p>
        `;

        review.appendChild(div);
    });
}

function restartQuiz() {

    current = 0;
    answers = Array(questions.length).fill(null);
    time = 300;

    document.getElementById("resultPage")
        .classList.add("hide");

    document.getElementById("startPage")
        .classList.remove("hide");

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("className").value = "";

    document.getElementById("review").innerHTML = "";
}