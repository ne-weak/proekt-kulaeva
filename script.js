// 1. Данные теста
const questions = [
    { text: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { text: "Вам жизненно необходимо постоянно менять обстановку и круг общения?", type: "sanguine" },
    { text: "Вас практически невозможно вывести из себя даже в острых ситуациях?", type: "phlegmatic" },
    { text: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
    { text: "Ваша речь быстрая, эмоциональная и сопровождается активной мимикой?", type: "choleric" },
    { text: "Вы легко справляетесь с несколькими сложными делами одновременно?", type: "sanguine" },
    { text: "Вы долго обдумываете свои слова и поступки, прежде чем действовать?", type: "phlegmatic" },
    { text: "Мелкие неудачи способны надолго испортить вам настроение?", type: "melancholic" }
];

const results = {
    "sanguine": {
        title: "Сангвиник",
        portrait: "Живой, жизнерадостный и очень подвижный человек. Ваша нервная система быстро переключается.",
        society: "Вы — душа компании и мастер коммуникации. Легко заводите знакомства.",
        career: "Вам подходят динамичные сферы: продажи, PR, журналистика."
    },
    "choleric": {
        title: "Холерик",
        portrait: "Энергичный, страстный и решительный человек. Вы склонны к бурным эмоциям.",
        society: "Прирожденный лидер. Люди тянутся к вашей уверенности.",
        career: "Вы незаменимы в управлении и кризисных ситуациях."
    },
    "phlegmatic": {
        title: "Флегматик",
        portrait: "Невозмутимый, спокойный и рассудительный человек.",
        society: "Островок стабильности. В коллективе вас ценят за отсутствие интриг.",
        career: "Ваша стихия — системность. Аналитика, разработка, финансы."
    },
    "melancholic": {
        title: "Меланхолик",
        portrait: "Глубокий, вдумчивый и крайне чувствительный человек.",
        society: "Тонкий эмпат. Вы выбираете немногих, но преданных друзей.",
        career: "Ваш талант раскрывается в творчестве, науке или психологии."
    },
    "phlegmatic-sanguine": {
        title: "Сангвиник-Флегматик",
        portrait: "Спокойный оптимист. Редкое сочетание легкости и железной надежности.",
        society: "Вы общительны, но очень рассудительны.",
        career: "Универсальный специалист. Умеете и договариваться, и методично работать."
    }
};

// 2. Логика приложения
let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

// Главная функция отрисовки
function render() {
    const app = document.getElementById('app');
    if (!app) return;

    if (currentIdx < questions.length) {
        // Рендерим вопрос
        app.innerHTML = `
            <span class="q-num">Вопрос ${currentIdx + 1} из ${questions.length}</span>
            <h2>${questions[currentIdx].text}</h2>
            <div class="options">
                <button class="opt-btn" onclick="handleAnswer(1)"><span>1</span> Да, точно</button>
                <button class="opt-btn" onclick="handleAnswer(2)"><span>2</span> Похоже на меня</button>
                <button class="opt-btn" onclick="handleAnswer(3)"><span>3</span> Сомневаюсь</button>
                <button class="opt-btn" onclick="handleAnswer(4)"><span>4</span> Не совсем</button>
                <button class="opt-btn" onclick="handleAnswer(5)"><span>5</span> Точно нет</button>
            </div>
        `;
    } else {
        // Вычисляем и рендерим результат
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const top1 = sorted[0][0];
        const top2 = sorted[1][0];
        
        let key = (sorted[0][1] - sorted[1][1] < 5) ? [top1, top2].sort().join('-') : top1;
        const res = results[key] || results[top1];

        app.innerHTML = `
            <h1 class="res-title">${res.title}</h1>
            <div class="scroll-box">
                <div class="section">
                    <h4>Психологический портрет</h4>
                    <p>${res.portrait}</p>
                </div>
                <div class="section">
                    <h4>В обществе</h4>
                    <p>${res.society}</p>
                </div>
                <div class="section">
                    <h4>Карьера</h4>
                    <p>${res.career}</p>
                </div>
            </div>
            <button class="restart-btn" onclick="location.reload()">Начать заново</button>
        `;
    }
}

// Обработка клика
window.handleAnswer = function(val) {
    const type = questions[currentIdx].type;
    scores[type] += (6 - val); // 1 = 5 баллов, 5 = 1 балл
    currentIdx++;
    render();
};

// 3. ЗАПУСК при загрузке страницы
document.addEventListener('DOMContentLoaded', render);
