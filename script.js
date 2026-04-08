const tests = {
    main: {
        title: "Глубокий анализ личности",
        questions: [
            { q: "Вы быстро включаетесь в новую работу и легко переключаете внимание?", type: "sanguine" },
            { q: "Вас легко вывести из себя, вы бываете вспыльчивы?", type: "choleric" },
            { q: "Вы предпочитаете проверенные методы новым экспериментам?", type: "phlegmatic" },
            { q: "Вы часто расстраиваетесь из-за мелочей, которые другие не замечают?", type: "melancholic" },
            { q: "Вы любите быть в центре внимания и много общаться?", type: "sanguine" },
            { q: "В споре вы до конца отстаиваете свою правоту, иногда переходя на крик?", type: "choleric" },
            { q: "Вы медлительны в движениях и речи, но очень усидчивы?", type: "phlegmatic" },
            { q: "Вы склонны к самоанализу и часто ищете в себе недостатки?", type: "melancholic" },
            { q: "Вы быстро забываете неудачи и идете дальше с улыбкой?", type: "sanguine" },
            { q: "Вы часто берете на себя риск, не дожидаясь одобрения других?", type: "choleric" },
            { q: "Вас трудно рассмешить или заставить активно проявлять эмоции?", type: "phlegmatic" },
            { q: "Мир кажется вам часто враждебным или непонятным?", type: "melancholic" },
            { q: "Вы легко заводите новые знакомства на любом мероприятии?", type: "sanguine" },
            { q: "Вы терпеть не можете ждать и часто подгоняете окружающих?", type: "choleric" },
            { q: "Вы можете долго выполнять монотонную работу без потери качества?", type: "phlegmatic" },
            { q: "Вы очень чувствительны к критике, даже если она конструктивна?", type: "melancholic" }
        ]
    }
};

const resultsData = {
    "sanguine": { t: "Сангвиник", p: "Живой, подвижный человек, быстро реагирующий на события." },
    "choleric": { t: "Холерик", p: "Быстрый, страстный, порывистый, однако совершенно неуравновешенный." },
    "phlegmatic": { t: "Флегматик", p: "Медлительный, невозмутимый, с устойчивыми стремлениями и настроением." },
    "melancholic": { t: "Меланхолик", p: "Чувствительный человек, склонный к глубоким переживаниям при малых событиях." }
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
        <span class="q-top">Профессиональный тест</span>
        <h2 style="margin-bottom:25px">Готовы узнать свой смешанный тип?</h2>
        <div class="options">
            <button class="opt-btn" onclick="startTest('main')"><span>▶</span> Запустить полное тестирование</button>
        </div>
        <p style="margin-top:20px; font-size:0.8rem; opacity:0.6">Тест содержит 16 вопросов для максимально точного результата.</p>
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
        <span class="q-top">Вопрос ${currentQ + 1} из ${currentTest.questions.length}</span>
        <h2 style="min-height: 80px;">${q.q}</h2>
        <div class="options">
            <button class="opt-btn" onclick="handle(5)"><span>A</span> Да, это про меня</button>
            <button class="opt-btn" onclick="handle(3)"><span>B</span> Иногда бывает</button>
            <button class="opt-btn" onclick="handle(0)"><span>C</span> Нет, не согласен</button>
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
    // Сортируем типы по баллам
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    const primary = sorted[0];
    const secondary = sorted[1];
    
    const mainType = resultsData[primary[0]];
    const extraType = resultsData[secondary[0]];

    app.innerHTML = `
        <div id="capture-area" style="padding: 20px;">
            <span class="q-top">Ваш результат:</span>
            <h1 style="font-size: 2rem; color: var(--accent); margin-bottom: 10px;">${mainType.t}</h1>
            <p style="opacity:0.8; margin-bottom: 25px;">С выраженными чертами: <strong>${extraType.t}а</strong></p>
            
            <div class="block">
                <h4>Доминирующий профиль</h4>
                <p>${mainType.p}</p>
            </div>
            
            <div class="block">
                <h4>Дополнительное влияние</h4>
                <p>Ваша личность более гибкая благодаря второму типу. Это дает вам ${secondary[0] === 'phlegmatic' ? 'устойчивость' : 'дополнительную энергию'} в сложных ситуациях.</p>
            </div>

            <div class="block">
                <h4>Ваша комбинация</h4>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <div style="height:8px; background:var(--accent); width:${(primary[1]/(primary[1]+secondary[1])*100)}%; border-radius:4px;"></div>
                    <div style="height:8px; background:rgba(255,255,255,0.2); width:${(secondary[1]/(primary[1]+secondary[1])*100)}%; border-radius:4px;"></div>
                </div>
            </div>
        </div>
        <button class="reset-btn" onclick="savePhoto()">Сохранить результат (PNG)</button>
        <button class="back-link" style="display:block; margin: 15px auto; background:none; border:none; color:#fff; opacity:0.5; cursor:pointer;" onclick="showMenu()">Пройти заново</button>
    `;
}

function savePhoto() {
    const area = document.getElementById('capture-area');
    html2canvas(area, { backgroundColor: '#161d31', borderRadius: 45, scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-personality-type.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', showMenu);
