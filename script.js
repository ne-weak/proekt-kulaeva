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
    sanguine: {
        title: "Яркий Сангвиник",
        desc: "<b>Психологический портрет:</b> Вы тип личности с сильной и подвижной нервной системой. В процессе социализации вы легко усваиваете нормы общества. <br><br><b>В общении:</b> Вы — 'социальный клей'. Ваша эмпатия и оптимизм делают вас желанным собеседником."
    },
    choleric: {
        title: "Мощный Холерик",
        desc: "<b>Психологический портрет:</b> Ваша личность базируется на страстном, неуравновешенном темпераменте. Вы — индивид, ориентированный на преобразование реальности. <br><br><b>В общении:</b> Вы лидер и инициатор. Влияние на окружающих выражается в ведении за собой, но требует самоконтроля."
    },
    phlegmatic: {
        title: "Стабильный Флегматик",
        desc: "<b>Психологический портрет:</b> Вы — оплот спокойствия и надежности. Ваша нервная система инертна, но крайне сильна. Демонстрируете высокую устойчивость к стрессам.<br><br><b>В общении:</b> На вас всегда можно положиться. Вы вносите в коллектив баланс и рассудительность."
    },
    melancholic: {
        title: "Глубокий Меланхолик",
        desc: "<b>Психологический портрет:</b> Вы обладаете тонкой душевной организацией. Ваша чувствительность (индивид) позволяет вам видеть мир глубже других. Формируетесь через рефлексию.<br><br><b>В общении:</b> Вы — тактичный и преданный друг. Ваше влияние на людей мягкое и вдохновляющее."
    }
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    // 1 (Точно да) = 4 балла, 5 (Точно нет) = 0 баллов
    const points = (5 - val); 
    const type = questions[currentIdx].type;
    scores[type] += points;

    currentIdx++;
    updateQuiz();
}

function updateQuiz() {
    if (currentIdx < questions.length) {
        document.getElementById('question-text').innerText = questions[currentIdx].q;
        document.getElementById('current-num').innerText = currentIdx + 1;
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
