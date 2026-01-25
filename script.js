const questions = [
  {
    text: `From: "Support Team" <support@secure-payments.com>
Subject: Urgent: Verify your account now!

Dear user,

We noticed unusual activity on your account. 
Please verify your information immediately to avoid suspension:

https://secure-payments.com.verify-login.net/security-check

Thank you.`,
    isPhishing: true,
    explanation:
      "Suspicious URL (verify-login.net), urgent language, and request to 'verify your information' via a link."
  },
  {
    text: `From: "GitHub" <noreply@github.com>
Subject: New sign-in from Chrome on Windows

We noticed a new sign-in to your GitHub account from Chrome on Windows.
If this was you, you can safely ignore this email.
If this wasn't you, you can review your account activity here: https://github.com/settings/security

Thanks,
The GitHub team`,
    isPhishing: false,
    explanation:
      "Legitimate-looking domain (github.com), no request to enter credentials directly in the email, neutral tone."
  },
  {
    text: `From: "Bank Security" <security@bank-example.com>
Subject: Your account will be closed in 24 hours!

Dear customer,

Your bank account will be CLOSED in 24 hours due to security reasons.
To keep your account active, please confirm your identity by entering your card number and PIN here:

http://bank-example.com.verify-account.ru/login

Sincerely,
Security Department`,
    isPhishing: true,
    explanation:
      "Threatening tone, asks for card number and PIN, and uses a suspicious mixed domain (verify-account.ru)."
  },
  {
    text: `From: "Company HR" <hr@company.com>
Subject: Updated privacy policy

Hello,

We have updated our internal privacy policy. You can read the new version on our intranet:

https://intranet.company.com/policies/privacy

If you have any questions, contact HR.

Best regards,
HR`,
    isPhishing: false,
    explanation:
      "No request for credentials, neutral language, and internal domain for policy review."
  },
  {
    text: `From: "Microsoft account team" <security@rnicrosoft.com>
Subject: Unusual sign-in activity

We detected something unusual about a recent sign-in to your Microsoft account.

Sign-in details:
- Country/region: Germany
- Platform: Windows
- Browser: Chrome

If this was you, you can safely ignore this email.
If this wasn’t you, we recommend that you review your recent activity and secure your account:

https://account.microsoft.com/security-review

Thanks,
Microsoft account team`,
    isPhishing: true,
    explanation:
      "The domain uses 'rnicrosoft.com' (rn instead of m). Attackers often abuse similar-looking characters. The visible link text shows a legitimate Microsoft URL but the actual hyperlink points somewhere else – attackers often disguise malicious links this way, so you should always hover over links and check the real destination before clicking."
  }
];

let currentIndex = 0;
let correctAnswers = 0;
let answersLog = []; // { index, isCorrect }

const messageTextEl = document.getElementById("message-text");
const btnPhishing = document.getElementById("btn-phishing");
const btnLegit = document.getElementById("btn-legit");
const feedbackEl = document.getElementById("feedback");
const feedbackResultEl = document.getElementById("feedback-result");
const feedbackExplanationEl = document.getElementById("feedback-explanation");
const btnNext = document.getElementById("btn-next");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");

const summaryEl = document.getElementById("summary");
const summaryScoreEl = document.getElementById("summary-score");
const summaryPercentageEl = document.getElementById("summary-percentage");
const summaryListEl = document.getElementById("summary-list");
const btnRestart = document.getElementById("btn-restart");

function showQuestion() {
  const q = questions[currentIndex];
  messageTextEl.textContent = q.text;
  feedbackEl.classList.add("hidden");
  summaryEl.classList.add("hidden");

  btnPhishing.disabled = false;
  btnLegit.disabled = false;

  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${correctAnswers} / ${questions.length}`;
}

function handleAnswer(isPhishingAnswer) {
  const q = questions[currentIndex];
  const isCorrect = q.isPhishing === isPhishingAnswer;

  answersLog[currentIndex] = { index: currentIndex, isCorrect };

  if (isCorrect) {
    feedbackResultEl.textContent = "Correct!";
    feedbackResultEl.style.color = "#4caf50";
    correctAnswers++;
  } else {
    feedbackResultEl.textContent = "Incorrect.";
    feedbackResultEl.style.color = "#f44336";
  }

  feedbackExplanationEl.textContent = q.explanation;
  feedbackEl.classList.remove("hidden");
  btnPhishing.disabled = true;
  btnLegit.disabled = true;

  scoreEl.textContent = `Score: ${correctAnswers} / ${questions.length}`;

  if (currentIndex === questions.length - 1) {
    btnNext.textContent = "Show results";
  } else {
    btnNext.textContent = "Next";
  }
}

function showSummary() {
  // Считаем процент
  const total = questions.length;
  const percent = Math.round((correctAnswers / total) * 100);

  summaryScoreEl.textContent = `You answered correctly ${correctAnswers} out of ${total} questions.`;
  summaryPercentageEl.textContent = `Accuracy: ${percent}%`;

  // Список по вопросам
  summaryListEl.innerHTML = "";
  questions.forEach((q, idx) => {
    const li = document.createElement("li");
    const log = answersLog[idx];
    const isCorrect = log?.isCorrect;

    li.textContent = `Question ${idx + 1}`;
    if (isCorrect) {
      li.classList.add("summary-item-correct");
    } else {
      li.classList.add("summary-item-wrong");
    }

    summaryListEl.appendChild(li);
  });

  // Показываем summary, скрывать саму карточку не обязательно,
  // но можно спрятать feedback
  feedbackEl.classList.add("hidden");
  summaryEl.classList.remove("hidden");
}

function nextQuestion() {
  if (currentIndex === questions.length - 1) {
    showSummary();
  } else {
    currentIndex++;
    showQuestion();
  }
}

function restart() {
  currentIndex = 0;
  correctAnswers = 0;
  answersLog = [];
  summaryEl.classList.add("hidden");
  showQuestion();
}

btnPhishing.addEventListener("click", () => handleAnswer(true));
btnLegit.addEventListener("click", () => handleAnswer(false));
btnNext.addEventListener("click", nextQuestion);
btnRestart.addEventListener("click", restart);

showQuestion();