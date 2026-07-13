let studentName = "";
let score = 0;
let questionCount = 1;
let correctAnswer = 0;
let totalQuestions = 10;


// تبدیل عدد انگلیسی به فارسی
function persianNumber(number) {
    return number.toString()
        .replace(/0/g, "۰")
        .replace(/1/g, "۱")
        .replace(/2/g, "۲")
        .replace(/3/g, "۳")
        .replace(/4/g, "۴")
        .replace(/5/g, "۵")
        .replace(/6/g, "۶")
        .replace(/7/g, "۷")
        .replace(/8/g, "۸")
        .replace(/9/g, "۹");
}


// شروع بازی
document.getElementById("startBtn").onclick = function () {

    studentName = document.getElementById("studentName").value;

    if (studentName.trim() === "") {
        alert("لطفاً نام دانش‌آموز را وارد کنید");
        return;
    }

    document.getElementById("showName").innerHTML = studentName;

    document.getElementById("startPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";

    createQuestion();
};


// ساخت سؤال تصادفی
function createQuestion() {

    document.getElementById("message").innerHTML = "";

    let target = Math.floor(Math.random() * 9) + 1;

    correctAnswer = target;

    document.getElementById("targetNumber").innerHTML =
        persianNumber(target);


    let answers = [];


    // ساخت جواب درست
    let a = Math.floor(Math.random() * (target + 1));
    let b = target - a;

    answers.push({
        text: a + " + " + b,
        value: target
    });



    // ساخت سه جواب غلط
    while (answers.length < 4) {

        let x = Math.floor(Math.random() * 9) + 1;
        let y = Math.floor(Math.random() * 9) + 1;

        let sum = x + y;


        if (sum !== target &&
            !answers.some(item => item.value === sum)) {

            answers.push({
                text: x + " + " + y,
                value: sum
            });
        }
    }


    // مخلوط کردن گزینه‌ها
    answers.sort(() => Math.random() - 0.5);



    for (let i = 1; i <= 4; i++) {

        let btn = document.getElementById("op" + i);

        btn.innerHTML =
            persianNumber(i) + ") " +
            persianNumber(answers[i-1].text);

        btn.className = "option";

        btn.onclick = function () {

            checkAnswer(
                answers[i-1].value,
                btn
            );

        };

    }


    document.getElementById("questionNumber").innerHTML =
        persianNumber(questionCount);

}


// بررسی جواب
function checkAnswer(answer, button) {


    let buttons = document.querySelectorAll(".option");

    buttons.forEach(btn => {
        btn.onclick = null;
    });


    if (answer === correctAnswer) {

        score++;

        button.classList.add("correct");

        document.getElementById("message").innerHTML =
            "🌟 آفرین! درست جواب دادی 🌟";

    } 
    
    else {

        button.classList.add("wrong");

        document.getElementById("message").innerHTML =
            "😊 دوباره تلاش کن";

    }


    document.getElementById("score").innerHTML =
        persianNumber(score);

}


// سؤال بعدی

document.getElementById("nextBtn").onclick = function () {


    if (questionCount < totalQuestions) {

        questionCount++;

        createQuestion();

    }

    else {

        finishGame();

    }

};



// پایان بازی

function finishGame() {


    document.getElementById("gamePage").style.display="none";

    document.getElementById("finishPage").style.display="block";


    document.getElementById("resultName").innerHTML =
        "آفرین " + studentName + " 🌸";


    document.getElementById("finalScore").innerHTML =
        persianNumber(score) +
        " از " +
        persianNumber(totalQuestions);

}