const tests = {
    main: {
        title: "Базовый темперамент",
        questions: [
            { q: "Вы быстро переключаетесь между задачами и любите перемены?", type: "sanguine" },
            { q: "Вы часто действуете импульсивно, а потом анализируете?", type: "choleric" },
            { q: "Вам требуется много времени на обдумывание перед ответом?", type: "phlegmatic" },
            { q: "Вы глубоко переживаете даже мелкие замечания в свой адрес?", type: "melancholic" },
            { q: "Вы чувствуете прилив сил в центре шумного мероприятия?", type: "sanguine" },
            { q: "Вы склонны открыто проявлять гнев, если что-то идет не так?", type: "choleric" },
            { q: "Вас практически невозможно вывести из равновесия?", type: "phlegmatic" },
            { q: "Вы предпочитаете одиночество шумным компаниям?", type: "melancholic" }
        ]
    },
    social: {
        title: "Социальный профиль",
        questions: [
            { q: "Вам легко заговорить с незнакомым человеком?", type: "sanguine" },
            { q: "Вы часто берете на себя роль лидера в группе?", type: "choleric" },
            { q: "Вы предпочитаете наблюдать за конфликтом со стороны?", type: "phlegmatic" },
            { q: "Вы часто ищете скрытый смысл в словах собеседника?", type: "melancholic" }
        ]
    },
    influence: {
        title: "Факторы влияния",
        questions: [
            { q: "Чужой оптимизм легко передается вам?", type: "sanguine" },
            { q: "Вы мгновенно даете отпор на любую попытку давления?", type: "choleric" },
            { q: "Вы игнорируете чужую панику и сохраняете спокойствие?", type: "phlegmatic" },
            { q: "Вы долго восстанавливаетесь после тяжелого разговора?", type: "melancholic" }
        ]
    }
};

const resultsData = {
    "sanguine": { t: "Сангвиник", p: "Вы — оптимист с гибкой нервной системой. Легко адаптируетесь к переменам.", s: "Социальный магнит. Умеете вдохновлять людей и разряжать обстановку.", c: "Идеальны в коммуникациях, медиа и продажах." },
    "choleric": { t: "Холерик", p: "Человек действия. Обладаете огромной энергией, но склонны к перепадам настроения.", s: "Прирожденный лидер, который ведет за собой силой воли.", c: "Предпринимательство, управление, кризис-менеджмент." },
    "phlegmatic": { t: "Флегматик", p: "Олицетворение спокойствия. Ваши сильные стороны — выдержка и упорство.", s: "Надежный партнер, на которого всегда можно положиться.", c: "IT, архитектура, глубокая аналитика и инженерия." },
    "melancholic": { t: "Меланхолик", p: "Вдумчивая и глубокая личность. Тонко чувствуете нюансы мира.", s: "Эмпатичный слушатель. Цените искренность и глубину отношений.", c: "Творчество, психология, наука и аудит." }
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
        <h2 style="margin-bottom:25px">Выберите область анализа:</h2>
        <div class="options">
            <button class="opt-btn" onclick="startTest('main')"><span>1</span> Базовый психотип</button>
            <button class="opt-btn" onclick="startTest('social')"><span>2</span> Я в обществе</button>
            <button class="opt-btn" onclick="startTest('influence')"><span>3</span> Факторы стресса</button>
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
            <button class="opt-btn" onclick="handle(5)"><span>A</span> Полностью согласен</button>
            <button class="opt-btn" onclick="handle(3)"><span>B</span> Скорее да</button>
            <button class="opt-btn" onclick="handle(1)"><span>C</span> Сомневаюсь / Нет</button>
        </div>
    `;
}

function handle(v) {
    scores[currentTest.questions[currentQ].type] += v;
    currentQ++;
    if (currentQ < currentTest.questions.length) renderQuestion();
    else showResult();
}

function showResult() {
    const app = document.getElementById('app');
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const res = resultsData[sorted[0][0]];

    app.innerHTML = `
        <div id="capture-area">
            <span class="q-top">Ваш профиль определен:</span>
            <h1 style="font-size: 2.2rem; color: var(--accent); margin-bottom: 25px;">${res.t}</h1>
            <div class="block"><h4>Характеристика</h4><p>${res.p}</p></div>
            <div class="block"><h4>Взаимодействие</h4><p>${res.s}</p></div>
            <div class="block"><h4>Реализация</h4><p>${res.c}</p></div>
        </div>
        <button class="reset-btn" onclick="savePhoto()">Сохранить PNG</button>
        <button class="back-link" style="display:block; margin: 15px auto; background:none; border:none; color:#fff; opacity:0.5; cursor:pointer;" onclick="showMenu()">К списку тестов</button>
    `;
}

function savePhoto() {
    const area = document.getElementById('capture-area');
    html2canvas(area, { backgroundColor: '#161d31', borderRadius: 45 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-result.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', showMenu);
