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
        title: "Сангвиник",
        portrait: "Живой, жизнерадостный и подвижный человек с частой сменой впечатлений.",
        society: "Вы — душа компании. Легко сходитесь с людьми и обладаете природным обаянием.",
        career: "Креатор и коммуникатор. Продуктивны, пока работа интересна."
    },
    "choleric": {
        title: "Холерик",
        portrait: "Быстрый, порывистый и неуравновешенный тип с резкой сменой настроения.",
        society: "Лидер-реформатор. Часто берете ответственность на себя, но бываете резки.",
        career: "Кризис-менеджер. Ваша энергия пробивает любые стены."
    },
    "phlegmatic": {
        title: "Флегматик",
        portrait: "Невозмутимый человек со спокойными стремлениями и ровным настроением.",
        society: "Островок стабильности. Вас ценят за отсутствие интриг и дельные советы.",
        career: "Надежный стратег. Доводите дела до конца, когда другие уже сдались."
    },
    "melancholic": {
        title: "Меланхолик",
        portrait: "Человек, остро реагирующий на события, склонный к глубоким переживаниям.",
        society: "Глубокий эмпат. Тонко чувствуете людей и обладаете богатым внутренним миром.",
        career: "Мастер деталей. В аналитике и искусстве вам нет равных."
    },
    "phlegmatic-sanguine": {
        title: "Сангвиник-Флегматик",
        portrait: "Спокойный оптимист. Редкое сочетание легкости и железной надежности.",
        society: "Вы общительны, но рассудительны. Кажетесь мягким, но внутри железный стержень.",
        career: "Универсальный игрок. Умеете и договариваться, и методично работать."
    },
    "melancholic-phlegmatic": {
        title: "Флегматик-Меланхолик",
        portrait: "Мудрый наблюдатель. Глубокое спокойствие и аналитический склад ума.",
        society: "Вы видите суть вещей там, где другие видят хаос. Ваш покой — результат опыта.",
        career: "Идеальный эксперт. Ваша внимательность к деталям исключает ошибки."
    }
    // Добавь другие миксы (названия ключей должны быть по алфавиту: choleric-sanguine и т.д.)
};

let currentIdx = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function handleAnswer(val) {
    if (currentIdx < questions.length) {
        // Логика: 1 (Да) = 5 баллов, 5 (Нет) = 1 балл
        scores[questions[currentIdx].type] += (6 - val);
        currentIdx++;
        updateUI();
    }
}

function updateUI() {
    const quizCard = document.getElementById('quiz-card');
    const qText = document.getElementById('question-text');
    const qCounter = document.getElementById('q-counter');
    
    if (currentIdx < questions.length) {
        qText.innerText = questions[currentIdx].q;
        qCounter.innerText = `Вопрос ${currentIdx + 1} из ${questions.length}`;
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-card').classList.add('hidden');
    const resultCard = document.getElementById('result-card');
    resultCard.classList.remove('hidden');

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const first = sorted[0][0];
    const second = sorted[1][0];
    
    // Генерируем ключ микса (всегда по алфавиту для точности связи)
    let key = (sorted[0][1] - sorted[1][1] < 7) ? [first, second].sort().join('-') : first;
    const res = results[key] || results[first];

    document.getElementById('result-title').innerText = res.title;
    document.getElementById('result-info').innerHTML = `
        <div class="res-block">
            <h3>Психологический портрет:</h3>
            <p>${res.portrait}</p>
        </div>
        <div class="res-block">
            <h3>В обществе:</h3>
            <p>${res.society}</p>
        </div>
        <div class="res-block">
            <h3>Карьера и цели:</h3>
            <p>${res.career}</p>
        </div>
    `;
}

function restart() {
    currentIdx = 0;
    scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };
    document.getElementById('result-card').classList.add('hidden');
    document.getElementById('quiz-card').classList.remove('hidden');
    updateUI();
}
