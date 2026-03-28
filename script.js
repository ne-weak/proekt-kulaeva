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
        society: "Вы — душа компании. Легко заводите знакомства и гасите конфликты юмором.",
        career: "Вам подходят динамичные сферы: продажи, PR, журналистика или ивенты."
    },
    "choleric": {
        title: "Холерик",
        portrait: "Энергичный, страстный и решительный человек. Вы склонны к бурным эмоциям.",
        society: "Прирожденный лидер. Люди тянутся к вашей уверенности и энергии.",
        career: "Вы незаменимы в управлении проектами, бизнесе и кризисных ситуациях."
    },
    "phlegmatic": {
        title: "Флегматик",
        portrait: "Невозмутимый, спокойный и рассудительный. Обладаете завидным упорством.",
        society: "Островок стабильности. В коллективе вас ценят за отсутствие интриг и надежность.",
        career: "Ваша стихия — системность: IT, аналитика, инженерия или финансы."
    },
    "melancholic": {
        title: "Меланхолик",
        portrait: "Глубокий, вдумчивый и крайне чувствительный. Вы мастер деталей.",
        society: "Тонкий эмпат. Вы выбираете немногих, но преданных друзей.",
        career: "Ваш талант раскрывается в творчестве, науке, дизайне или психологии."
    },
    "phlegmatic-sanguine": {
        title: "Сангвиник-Флегматик",
        portrait: "Спокойный оптимист. Баланс между легкостью общения и внутренней надежностью.",
        society: "Вы общительны, но рассудительны. Кажетесь мягким, но внутри железный стержень.",
        career: "Универсальный специалист: умеете и договариваться, и методично работать."
    }
};

let current = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function renderApp() {
    const app = document.getElementById('app');
    
    if (current < questions.length) {
        // Рендерим вопрос
        app.innerHTML = `
            <div class="q-count">Вопрос ${current + 1} из ${questions.length}</div>
            <h2>${questions[current].text}</h2>
            <div class="options">
                <button class="opt-btn" onclick="answer(1)"><span>1</span> Да, точно</button>
                <button class="opt-btn" onclick="answer(2)"><span>2</span> Похоже на меня</button>
                <button class="opt-btn" onclick="answer(3)"><span>3</span> Сомневаюсь</button>
                <button class="opt-btn" onclick="answer(4)"><span>4</span> Не совсем</button>
                <button class="opt-btn" onclick="answer(5)"><span>5</span> Точно нет</button>
            </div>
        `;
    } else {
        // Рендерим результат
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const f = sorted[0][0];
        const s = sorted[1][0];
        
        let key = (sorted[0][1] - sorted[1][1] < 6) ? [f, s].sort().join('-') : f;
        const res = results[key] || results[f];

        app.innerHTML = `
            <h1 class="res-title">${res.title}</h1>
            <div class="scroll-box">
                <div class="res-block"><h4>Психологический портрет</h4><p>${res.portrait}</p></div>
                <div class="res-block"><h4>В обществе</h4><p>${res.society}</p></div>
                <div class="res-block"><h4>Карьера и цели</h4><p>${res.career}</p></div>
            </div>
            <button class="action-btn" onclick="location.reload()">Начать заново</button>
        `;
    }
}

// Привязываем функцию к окну, чтобы кнопки её видели
window.answer = (val) => {
    scores[questions[current].type] += (6 - val);
    current++;
    renderApp();
};

// СТАРТ ПРИЛОЖЕНИЯ
document.addEventListener('DOMContentLoaded', renderApp);
