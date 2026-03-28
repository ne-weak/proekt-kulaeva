const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо постоянно менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя даже в острых ситуациях?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
    { q: "Ваша речь быстрая, эмоциональная и сопровождается активной мимикой?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими сложными делами одновременно?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова и поступки, прежде чем действовать?", type: "phlegmatic" },
    { q: "Мелкие неудачи способны надолго испортить вам настроение?", type: "melancholic" },
    { q: "Вы склонны к риску и часто берете на себя роль лидера в группе?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления глубокому анализу ситуации?", type: "sanguine" },
    { q: "Вам важнее всего стабильность, предсказуемость и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете острую потребность побыть в одиночестве?", type: "melancholic" },
    { q: "Вы часто перебиваете собеседника из-за избытка эмоций или идей?", type: "choleric" },
    { q: "Вы быстро забываете обиды и легко прощаете людей?", type: "sanguine" },
    { q: "Вы можете долго заниматься рутинной работой, не теряя концентрации?", type: "phlegmatic" },
    { q: "Вы склонны искать скрытый смысл в словах окружающих?", type: "melancholic" },
    { q: "Ваше настроение может резко упасть без видимой на то причины?", type: "melancholic" },
    { q: "Вы часто с энтузиазмом беретесь за новое, не закончив старое?", type: "sanguine" },
    { q: "Вы предпочитаете наблюдать за конфликтом со стороны, а не участвовать?", type: "phlegmatic" },
    { q: "Вы часто действуете по первому импульсу, о чем потом можете жалеть?", type: "choleric" }
];

const results = {
    "sanguine": { 
        title: "Чистый Сангвиник", 
        info: `
            <div class="res-block portrait-box"><h3>Психологический портрет:</h3><p>Живой, жизнерадостный и очень подвижный человек с частой сменой впечатлений и быстрой реакцией на все события вокруг.</p></div>
            <div class="res-block"><h3>В обществе:</h3><p>Вы — «душа компании». Легко сходитесь с новыми людьми, обладаете природным обаянием и умеете разрядить любую обстановку.</p></div>
            <div class="res-block"><h3>Карьера и Цели:</h3><p>Вы идеальный коммуникатор и креатор. Ваша гибкость позволяет вам выживать в условиях неопределенности, где другие сдаются.</p></div>
            <div class="fact-badge">Факт: Сангвиники обладают самой высокой скоростью переключения внимания.</div>`
    },
    "choleric": { 
        title: "Чистый Холерик", 
        info: `
            <div class="res-block portrait-box"><h3>Психологический портрет:</h3><p>Быстрый, страстный, порывистый, однако совершенно неуравновешенный тип с резко меняющимся настроением.</p></div>
            <div class="res-block"><h3>В обществе:</h3><p>Вы — лидер-реформатор. В группе вы часто берете на себя ответственность в критические моменты. Ваша прямолинейность — это ваш таран.</p></div>
            <div class="res-block"><h3>Карьера и Цели:</h3><p>Вы рождены для управления и кризис-менеджмента. Ваша энергия способна пробивать любые стены на пути к цели.</p></div>
            <div class="fact-badge">Факт: Холерики принимают решения быстрее всех остальных типов темперамента.</div>`
    },
    "phlegmatic": { 
        title: "Чистый Флегматик", 
        info: `
            <div class="res-block portrait-box"><h3>Психологический портрет:</h3><p>Невозмутимый человек со спокойными стремлениями и ровным настроением.</p></div>
            <div class="res-block"><h3>В обществе:</h3><p>Вы — «островок стабильности». В коллективе вас ценят за отсутствие интриг и умение объективно оценивать ситуацию без лишних эмоций.</p></div>
            <div class="res-block"><h3>Карьера и Цели:</h3><p>Ваша суперсила — невероятное упорство. Пока другие паникуют, вы методично доводите проект до идеального финала.</p></div>
            <div class="fact-badge">Факт: Флегматики — самые надежные стратеги в условиях длительного стресса.</div>`
    },
    "melancholic": { 
        title: "Чистый Меланхолик", 
        info: `
            <div class="res-block portrait-box"><h3>Психологический портрет:</h3><p>Человек, остро реагирующий на любые события, склонный к глубоким переживаниям даже по незначительным поводам.</p></div>
            <div class="res-block"><h3>В обществе:</h3><p>Вы — эмпат. Тонко чувствуете людей и обладаете глубоким внутренним миром. Ваша интуиция — бесценный дар для любой команды.</p></div>
            <div class="res-block"><h3>Карьера и Цели:</h3><p>Ваша стихия — аналитика, искусство и программирование. Ваша требовательность к деталям создает продукты высшего качества.</p></div>
            <div class="fact-badge">Факт: Меланхолики обладают самой развитой эмпатией и художественным вкусом.</div>`
    },
    "choleric-sanguine": { title: "Холерик-Сангвиник", info: "<div class='res-block portrait-box'><h3>Микс: Лидер-вдохновитель</h3><p>Вы сочетаете пробивную энергию с природным обаянием. Вы не просто ведете людей за собой, вы заставляете их верить в общую мечту.</p></div>" },
    "phlegmatic-sanguine": { title: "Сангвиник-Флегматик", info: "<div class='res-block portrait-box'><h3>Микс: Спокойный оптимист</h3><p>Вы общительны, но очень рассудительны. Редкое сочетание легкости и железной надежности.</p></div>" },
    "melancholic-sanguine": { title: "Сангвиник-Меланхолик", info: "<div class='res-block portrait-box'><h3>Микс: Творческий эмпат</h3><p>Ваша социальная активность скрывает очень глубокий внутренний мир. Вы чувствуете людей буквально кожей.</p></div>" },
    "choleric-phlegmatic": { title: "Холерик-Флегматик", info: "<div class='res-block portrait-box'><h3>Микс: Железный стратег</h3><p>Вы можете долго копить силы, чтобы нанести один, но максимально точный и сокрушительный удар в делах.</p></div>" },
    "choleric-melancholic": { title: "Холерик-Меланхолик", info: "<div class='res-block portrait-box'><h3>Микс: Взрывной творец</h3><p>Вы живете на пике эмоций. Ваша чувствительность — это топливо для вашей невероятной продуктивности.</p></div>" },
    "melancholic-phlegmatic": { title: "Флегматик-Меланхолик", info: "<div class='res-block portrait-box'><h3>Микс: Мудрый наблюдатель</h3><p>Вы видите суть вещей там, где другие видят хаос. Ваш покой — это результат глубокого понимания жизни.</p></div>" }
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    if (currentIdx < questions.length) {
        scores[questions[currentIdx].type] += (6 - val);
        currentIdx++;
        updateUI();
    }
}

function updateUI() {
    const qText = document.getElementById('question-text');
    const qCounter = document.getElementById('q-counter');
    const progress = document.getElementById('progress');

    if (currentIdx < questions.length) {
        qText.innerText = questions[currentIdx].q;
        qCounter.innerText = `Вопрос ${currentIdx + 1} из ${questions.length}`;
        progress.style.width = ((currentIdx / questions.length) * 100) + "%";
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const first = sorted[0];
    const second = sorted[1];

    let key = (first[1] - second[1] < 7) ? [first[0], second[0]].sort().join('-') : first[0];

    const res = results[key] || results[first[0]];
    document.getElementById('result-title').innerText = res.title;
    document.getElementById('result-info').innerHTML = res.info;
}
updateUI();
