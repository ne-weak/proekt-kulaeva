const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей и остро реагируете?", type: "melancholic" },
    { q: "Ваша речь быстрая, эмоциональная и с активной мимикой?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими делами одновременно?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова, прежде чем высказаться?", type: "phlegmatic" },
    { q: "Мелкие неудачи способны надолго выбить вас из колеи?", type: "melancholic" },
    { q: "Вы склонны к риску и часто берете на себя роль лидера?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления глубокому анализу?", type: "sanguine" },
    { q: "Вам важнее всего порядок, предсказуемость и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете потребность в одиночестве?", type: "melancholic" },
    { q: "Вы часто перебиваете собеседника из-за обилия идей?", type: "choleric" },
    { q: "Вы быстро забываете обиды и легко прощаете?", type: "sanguine" },
    { q: "Вы можете долго заниматься рутиной, не теряя спокойствия?", type: "phlegmatic" },
    { q: "Вы склонны искать скрытый смысл в словах окружающих?", type: "melancholic" },
    { q: "Ваше настроение может упасть без видимой причины?", type: "melancholic" },
    { q: "Вы часто беретесь за новое, не закончив старое?", type: "sanguine" },
    { q: "Вы предпочитаете наблюдать за конфликтом со стороны?", type: "phlegmatic" },
    { q: "Вы часто действуете по первому импульсу, а потом жалеете?", type: "choleric" }
];

const results = {
    "sanguine": { 
        title: "Чистый Сангвиник", 
        content: `
            <div class="res-section"><h3>Кто вы:</h3><p>Живой, подвижный человек. Ваша нервная система сильная и гибкая. Вы — природный оптимист.</p></div>
            <div class="res-section"><h3>Сильные стороны:</h3><p>Высокая адаптивность. Вы душа компании и мастер переговоров. Легко отпускаете негатив.</p></div>
            <div class="res-section"><h3>Слабые стороны:</h3><p>Склонность к поверхностности. Вам сложно концентрироваться на скучных, долгих задачах.</p></div>
            <div class="fact-box">Факт: Сангвиники быстрее всех восстанавливаются после стрессовых ситуаций.</div>`
    },
    "choleric": { 
        title: "Чистый Холерик", 
        content: `
            <div class="res-section"><h3>Кто вы:</h3><p>Человек действия. Ваша энергия бьет через край, а воля способна пробивать стены.</p></div>
            <div class="res-section"><h3>Сильные стороны:</h3><p>Прирожденный лидер. Вы не боитесь ответственности и принимаете решения мгновенно.</p></div>
            <div class="res-section"><h3>Слабые стороны:</h3><p>Вспыльчивость. Ваша прямолинейность часто воспринимается окружающими как агрессия.</p></div>
            <div class="fact-box">Факт: Из холериков выходят лучшие антикризисные менеджеры.</div>`
    },
    "phlegmatic": { 
        title: "Чистый Флегматик", 
        content: `
            <div class="res-section"><h3>Кто вы:</h3><p>Островок стабильности. Ваша психика инертна, что делает вас самым спокойным типом.</p></div>
            <div class="res-section"><h3>Сильные стороны:</h3><p>Хладнокровие и упорство. Вы доводите до конца то, на чем другие ломаются. Надежны на 100%.</p></div>
            <div class="res-section"><h3>Слабые стороны:</h3><p>Трудный подъем. Вам тяжело менять привычки и входить в новый ритм жизни.</p></div>
            <div class="fact-box">Факт: Флегматики — самые верные друзья и партнеры.</div>`
    },
    "melancholic": { 
        title: "Чистый Меланхолик", 
        content: `
            <div class="res-section"><h3>Кто вы:</h3><p>Тонкий стратег и эмпат. Вы чувствуете мир на более глубоких частотах, чем остальные.</p></div>
            <div class="res-section"><h3>Сильные стороны:</h3><p>Внимание к деталям. Вы видите скрытые угрозы и возможности. Глубокое творческое начало.</p></div>
            <div class="res-section"><h3>Слабые стороны:</h3><p>Ранимость. Вы долго переживаете обиды и быстро устаете от шумных компаний.</p></div>
            <div class="fact-box">Факт: Большинство выдающихся ученых и поэтов были меланхоликами.</div>`
    },
    // Смешанные (краткие версии для примера, можно расширять по аналогии)
    "choleric-sanguine": { title: "Холерик-Сангвиник", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Активный лидер-вдохновитель. Вы сочетаете мощную энергию с обаянием. Вы — мотор любого проекта.</p></div>" },
    "phlegmatic-sanguine": { title: "Сангвиник-Флегматик", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Спокойный оптимист. Вы общительны, но рассудительны. Редкое сочетание надежности и легкости.</p></div>" },
    "melancholic-sanguine": { title: "Сангвиник-Меланхолик", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Творческий эмпат. Ваша общительность скрывает богатый и сложный внутренний мир.</p></div>" },
    "choleric-phlegmatic": { title: "Холерик-Флегматик", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Стальной стратег. Вы можете долго терпеть, но ваш ответный удар будет сокрушительным.</p></div>" },
    "choleric-melancholic": { title: "Холерик-Меланхолик", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Взрывной творец. Вы живете на пике эмоций, создавая уникальные вещи через внутреннюю борьбу.</p></div>" },
    "melancholic-phlegmatic": { title: "Флегматик-Меланхолик", content: "<div class='res-section'><h3>Ваш микс:</h3><p>Мудрый наблюдатель. Вы видите суть вещей и людей, оставаясь при этом абсолютно спокойным.</p></div>" }
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
    if (currentIdx < questions.length) {
        document.getElementById('q-counter').innerText = `Вопрос ${currentIdx + 1} из ${questions.length}`;
        document.getElementById('question-text').innerText = questions[currentIdx].q;
        document.getElementById('progress').style.width = (currentIdx / questions.length * 100) + "%";
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
    document.getElementById('result-desc').innerHTML = res.content;
}
updateUI();
