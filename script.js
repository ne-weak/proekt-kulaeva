const tests = {
    main: {
        title: "Тип личности",
        questions: [
            { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
            { q: "Вам жизненно необходимо постоянно менять обстановку и круг общения?", type: "sanguine" },
            { q: "Вас практически невозможно вывести из себя даже в острых ситуациях?", type: "phlegmatic" },
            { q: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
            { q: "Вы склонны к риску и часто берете на себя роль лидера?", type: "choleric" },
            { q: "Вы быстро забываете обиды и легко прощаете людей?", type: "sanguine" },
            { q: "Вам важнее всего стабильность, предсказуемость и тишина?", type: "phlegmatic" },
            { q: "Мелкие неудачи способны надолго испортить вам настроение?", type: "melancholic" }
        ]
    },
    social: {
        title: "Личность в обществе",
        questions: [
            { q: "В новой компании вы первым идете на контакт?", type: "sanguine" },
            { q: "Вам трудно сдерживать раздражение, если кто-то тупит?", type: "choleric" },
            { q: "Вы предпочитаете слушать и анализировать, а не говорить?", type: "phlegmatic" },
            { q: "Вам кажется, что окружающие часто вас недооценивают или не понимают?", type: "melancholic" }
        ]
    },
    influence: {
        title: "Влияние окружения",
        questions: [
            { q: "Энергичные люди вас вдохновляют, а не утомляют?", type: "sanguine" },
            { q: "Чужое давление вызывает у вас мгновенное желание дать отпор?", type: "choleric" },
            { q: "Вы легко сохраняете спокойствие, когда вокруг все паникуют?", type: "phlegmatic" },
            { q: "Вы сильно зависите от эмоционального фона в коллективе?", type: "melancholic" }
        ]
    }
};

const resultsData = {
    "sanguine": { t: "Сангвиник", p: "Живой, жизнерадостный человек. Вы мгновенно адаптируетесь к новому.", s: "Вы — социальный магнит и душа любой компании.", c: "PR, ивенты, продажи — ваша стихия." },
    "choleric": { t: "Холерик", p: "Страстный и решительный. У вас огромный запас энергии и драйва.", s: "Прирожденный лидер, который ведет за собой.", c: "Управление проектами и кризис-менеджмент." },
    "phlegmatic": { t: "Флегматик", p: "Невозмутимый и рассудительный. Обладаете завидным упорством.", s: "Островок безопасности для друзей и коллег.", c: "IT, аналитика и глубокие исследования." },
    "melancholic": { t: "Меланхолик", p: "Вдумчивый и чувствительный. Видите то, что другие упускают.", s: "Тонкий эмпат. Выбираете качество общения, а не количество.", c: "Творчество, психология и наука." }
};

let currentTest = null;
let currentQ = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function scrollToApp() {
    document.getElementById('test-app').scrollIntoView({ behavior: 'smooth' });
    showMenu();
}

function showMenu() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <span class="q-top">Тестирование</span>
        <h2>Выберите направление анализа:</h2>
        <div class="options">
            <button class="opt-btn" onclick="startTest('main')"><span>1</span> Базовый тип личности</button>
            <button class="opt-btn" onclick="startTest('social')"><span>2</span> Социальный профиль</button>
            <button class="opt-btn" onclick="startTest('influence')"><span>3</span> Факторы влияния</button>
        </div>
    `;
}

function startTest(key) {
    currentTest = tests[key];
    currentQ = 0;
    scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };
    renderQuestion();
}

function renderQuestion() {
    const app = document.getElementById('app');
    const q = currentTest.questions[currentQ];
    app.innerHTML = `
        <span class="q-top">${currentTest.title}: ${currentQ + 1} / ${currentTest.questions.length}</span>
        <h2>${q.q}</h2>
        <div class="options">
            <button class="opt-btn" onclick="handle(1)"><span>A</span> Полностью согласен</button>
            <button class="opt-btn" onclick="handle(2)"><span>B</span> Скорее да</button>
            <button class="opt-btn" onclick="handle(4)"><span>C</span> Скорее нет</button>
            <button class="opt-btn" onclick="handle(5)"><span>D</span> Точно нет</button>
        </div>
    `;
}

function handle(v) {
    scores[currentTest.questions[currentQ].type] += (6 - v);
    currentQ++;
    if (currentQ < currentTest.questions.length) renderQuestion();
    else showResult();
}

function showResult() {
    const app = document.getElementById('app');
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const res = resultsData[sorted[0][0]];

    app.innerHTML = `
        <div id="capture-area" style="padding: 10px;">
            <span class="mix-label">Результат анализа</span>
            <h1 class="res-title">${res.t}</h1>
            <div class="block"><h4>Психологический портрет</h4><p>${res.p}</p></div>
            <div class="block"><h4>В обществе</h4><p>${res.s}</p></div>
            <button class="reset-btn" onclick="savePhoto()">Скачать результат (PNG)</button>
            <button class="back-link" style="display:block; margin: 15px auto; width:100%" onclick="showMenu()">Пройти другой тест</button>
        </div>
    `;
}

function savePhoto() {
    const area = document.getElementById('capture-area');
    html2canvas(area, { backgroundColor: '#192037', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'result.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', showMenu);
