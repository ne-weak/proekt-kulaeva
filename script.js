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

const app = document.getElementById('app');

function showHome() {
    app.innerHTML = `
        <div class="fade-in">
            <span class="q-top">Проект самопознания</span>
            <h1 class="res-title" style="text-align:left; font-size: 2.5rem;">Добро пожаловать</h1>
            <p style="line-height:1.6; margin-bottom: 25px; opacity:0.8">
                Исследуйте глубины своего темперамента. Пройдите наши тесты, чтобы понять, как вы взаимодействуете с миром и людьми.
            </p>
            <div class="block" style="border-left: 3px solid var(--accent); background: rgba(255,255,255,0.02)">
                <p style="font-size: 0.9rem">Выберите один из трех специализированных тестов и получите детальный разбор личности.</p>
            </div>
            <button class="reset-btn" style="margin-top:20px" onclick="showMenu()">Перейти к опросам</button>
        </div>
    `;
}

function showMenu() {
    app.innerHTML = `
        <span class="q-top">Доступные тесты</span>
        <h2>Что выберем сегодня?</h2>
        <div class="options">
            <button class="opt-btn" onclick="startTest('main')"><span>1</span> Какой мой тип личности?</button>
            <button class="opt-btn" onclick="startTest('social')"><span>2</span> Я в обществе</button>
            <button class="opt-btn" onclick="startTest('influence')"><span>3</span> Влияние других типов</button>
        </div>
        <button class="back-link" onclick="showHome()">← Назад</button>
    `;
}

function startTest(key) {
    currentTest = tests[key];
    currentQ = 0;
    scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };
    renderQuestion();
}

function renderQuestion() {
    const q = currentTest.questions[currentQ];
    app.innerHTML = `
        <span class="q-top">${currentTest.title}: ${currentQ + 1} / ${currentTest.questions.length}</span>
        <h2>${q.q}</h2>
        <div class="options">
            <button class="opt-btn" onclick="next(1)"><span>1</span> Точно да</button>
            <button class="opt-btn" onclick="next(2)"><span>2</span> Похоже на меня</button>
            <button class="opt-btn" onclick="next(4)"><span>3</span> Вряд ли</button>
            <button class="opt-btn" onclick="next(5)"><span>4</span> Точно нет</button>
        </div>
    `;
}

window.next = (v) => {
    scores[currentTest.questions[currentQ].type] += (6 - v);
    currentQ++;
    if (currentQ < currentTest.questions.length) renderQuestion();
    else showResult();
};

function showResult() {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const res = resultsData[sorted[0][0]];

    app.innerHTML = `
        <div id="capture-area">
            <span class="mix-label">Ваш результат:</span>
            <h1 class="res-title">${res.t}</h1>
            <div class="scroll-area">
                <div class="block"><h4>Портрет</h4><p>${res.p}</p></div>
                <div class="block"><h4>В обществе</h4><p>${res.s}</p></div>
                <div class="block"><h4>Карьера</h4><p>${res.c}</p></div>
            </div>
        </div>
        <button class="reset-btn" onclick="savePhoto()">Сохранить результат (PNG)</button>
        <button class="back-link" style="display:block; margin: 15px auto;" onclick="showMenu()">К тестам</button>
    `;
}

function savePhoto() {
    const area = document.getElementById('capture-area');
    html2canvas(area, {
        backgroundColor: '#192037',
        borderRadius: 30,
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my_type.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', showHome);
