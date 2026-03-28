const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей?", type: "melancholic" },
    { q: "Ваша речь быстрая и эмоциональная?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими делами сразу?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова?", type: "phlegmatic" },
    { q: "Мелкие неудачи выбивают вас из колеи?", type: "melancholic" },
    { q: "Вы склонны к риску и лидерству?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления анализу?", type: "sanguine" },
    { q: "Вам важнее всего порядок и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете потребность в одиночестве?", type: "melancholic" }
];

const results = {
    sanguine: { title: "Сангвиник", desc: "<b>Психологический портрет:</b> Живой, подвижный и оптимистичный тип. Вы легко адаптируетесь к новым условиям и быстро находите общий язык с окружающими." },
    choleric: { title: "Холерик", desc: "<b>Психологический портрет:</b> Энергичный, страстный и решительный лидер. Ваша сила в действии, но важно уметь вовремя остановиться и выслушать других." },
    phlegmatic: { title: "Флегматик", desc: "<b>Психологический портрет:</b> Спокойный, надежный и невозмутимый человек. Вы — опора любого коллектива благодаря своей выдержке и рассудительности." },
    melancholic: { title: "Меланхолик", desc: "<b>Психологический портрет:</b> Чувствительный, вдумчивый и преданный тип. Вы видите глубину там, где другие проходят мимо. Ваша эмпатия — ваш дар." }
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    if (currentIdx >= questions.length) return;

    const type = questions[currentIdx].type;
    scores[type] += (5 - val); // 1 (Да) = 4 балла, 5 (Нет) = 0 баллов
    
    currentIdx++;
    updateUI();
}

function updateUI() {
    const qText = document.getElementById('question-text');
    const progressBar = document.getElementById('progress');

    if (currentIdx < questions.length) {
        // Обновляем прогресс и текст вопроса
        if (progressBar) progressBar.style.width = `${(currentIdx / questions.length) * 100}%`;
        if (qText) qText.innerText = questions[currentIdx].q;
    } else {
        // Показываем результат
        showResult();
    }
}

function showResult() {
    const quizCard = document.getElementById('quiz-card');
    const resultCard = document.getElementById('result-card');
    
    if (quizCard && resultCard) {
        quizCard.classList.add('hidden');
        resultCard.classList.remove('hidden');

        const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        document.getElementById('result-title').innerText = results[winner].title;
        document.getElementById('result-desc').innerHTML = results[winner].desc;
        // Заполняем линию до конца на финале
        document.getElementById('progress').style.width = "100%";
    }
}

// Инициализация при загрузке
window.onload = updateUI;
