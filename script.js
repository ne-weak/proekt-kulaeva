const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей?", type: "melancholic" },
    { q: "Ваша речь быстрая и эмоциональная?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими делами одновременно?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова?", type: "phlegmatic" },
    { q: "Мелкие неудачи способны надолго выбить вас из колеи?", type: "melancholic" },
    { q: "Вы склонны к риску и часто берете на себя роль лидера?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления анализу ситуации?", type: "sanguine" },
    { q: "Вам важнее всего порядок, предсказуемость и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете потребность в одиночестве?", type: "melancholic" }
];

const results = {
    sanguine: { title: "Сангвиник", desc: "<b>В обществе:</b> Вы — душа компании. Легко адаптируетесь и умеете разрядить обстановку юмором.", fact: "Сангвиники быстрее всех адаптируются к новым условиям." },
    choleric: { title: "Холерик", desc: "<b>В обществе:</b> Вы — решительный лидер. Ваша энергия заставляет всё вокруг двигаться.", fact: "У холериков самая быстрая реакция среди всех типов." },
    phlegmatic: { title: "Флегматик", desc: "<b>В обществе:</b> Вы — островок спокойствия. Надежны и не склонны к интригам.", fact: "Флегматики — самые стрессоустойчивые сотрудники." },
    melancholic: { title: "Меланхолик", desc: "<b>В обществе:</b> Вы — эмпат. Тонко чувствуете людей и обладаете глубоким внутренним миром.", fact: "Меланхолики чаще других становятся выдающимися творцами." }
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    if (currentIdx < questions.length) {
        scores[questions[currentIdx].type] += (5 - val);
        currentIdx++;
        updateUI();
    }
}

function updateUI() {
    const qText = document.getElementById('question-text');
    const progress = document.getElementById('progress');

    if (currentIdx < questions.length) {
        qText.innerText = questions[currentIdx].q;
        progress.style.width = (currentIdx / questions.length * 100) + "%";
    } else {
        document.getElementById('quiz-card').classList.add('hidden');
        document.getElementById('result-card').classList.remove('hidden');
        const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        document.getElementById('result-title').innerText = results[winner].title;
        document.getElementById('result-desc').innerHTML = `
            <p>${results[winner].desc}</p>
            <div class="fact-box">${results[winner].fact}</div>
        `;
    }
}

// Запуск первой отрисовки
updateUI();
