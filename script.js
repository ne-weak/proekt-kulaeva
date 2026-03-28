const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя или заставить нервничать?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
    { q: "Ваша речь быстрая, эмоциональная и сопровождается активной мимикой?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими делами одновременно?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова, прежде чем высказаться в группе?", type: "phlegmatic" },
    { q: "Мелкие неудачи способны надолго выбить вас из колеи?", type: "melancholic" },
    { q: "Вы склонны к риску и часто берете на себя роль лидера в конфликте?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления глубокому анализу ситуации?", type: "sanguine" },
    { q: "В работе вам важнее всего порядок, предсказуемость и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете потребность в одиночестве для восстановления сил?", type: "melancholic" }
];

const results = {
    sanguine: { title: "Яркий Сангвиник", desc: "<b>Психологический портрет:</b> Сильная и подвижная нервная система.<br><br><b>В общении:</b> Легко адаптируетесь, умеете сопереживать, оптимистичны." },
    choleric: { title: "Мощный Холерик", desc: "<b>Психологический портрет:</b> Страстный, неуравновешенный, энергичный тип.<br><br><b>В общении:</b> Лидер и инициатор. Прямолинейны, но вам нужно учиться самоконтролю." },
    phlegmatic: { title: "Стабильный Флегматик", desc: "<b>Психологический портрет:</b> Уравновешенный, надежный, сильный тип.<br><br><b>В общении:</b> Спокойны, вносите баланс и рассудительность." },
    melancholic: { title: "Глубокий Меланхолик", desc: "<b>Психологический портрет:</b> Тонкая душевная организация, чувствительность.<br><br><b>В общении:</b> Тактичный и преданный друг. Чувствуете то, что другие упускают." }
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    const points = (5 - val); 
    scores[questions[currentIdx].type] += points;
    currentIdx++;
    
    // Эффект затухания
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.style.opacity = 0;
    
    setTimeout(() => {
        updateQuiz();
        wrapper.style.opacity = 1;
    }, 300);
}

function updateQuiz() {
    if (currentIdx < questions.length) {
        document.getElementById('question-text').innerText = questions[currentIdx].q;
        document.getElementById('progress').style.width = `${(currentIdx / questions.length) * 100}%`;
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    document.getElementById('result-title').innerText = results[winner].title;
    document.getElementById('result-desc').innerHTML = results[winner].desc;
}

updateQuiz();
