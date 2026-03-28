const questions = [
    { q: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { q: "Вам жизненно необходимо менять обстановку и круг общения?", type: "sanguine" },
    { q: "Вас практически невозможно вывести из себя?", type: "phlegmatic" },
    { q: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
    { q: "Ваша речь быстрая, эмоциональная и сопровождается активной мимикой?", type: "choleric" },
    { q: "Вы легко справляетесь с несколькими делами одновременно?", type: "sanguine" },
    { q: "Вы долго обдумываете свои слова, прежде чем высказаться?", type: "phlegmatic" },
    { q: "Мелкие неудачи способны надолго выбить вас из колеи?", type: "melancholic" },
    { q: "Вы склонны к риску и часто берете на себя роль лидера?", type: "choleric" },
    { q: "Вы предпочитаете яркие впечатления анализу ситуации?", type: "sanguine" },
    { q: "Вам важнее всего порядок, предсказуемость и тишина?", type: "phlegmatic" },
    { q: "Вы часто чувствуете потребность в одиночестве?", type: "melancholic" },
    { q: "Вы часто перебиваете собеседника из-за избытка идей?", type: "choleric" },
    { q: "Вы быстро забываете обиды и легко прощаете людей?", type: "sanguine" },
    { q: "Вы можете долго заниматься рутиной, не теряя концентрации?", type: "phlegmatic" },
    { q: "Вы склонны искать скрытый смысл в простых словах?", type: "melancholic" },
    { q: "Ваше настроение может резко упасть без видимой причины?", type: "melancholic" },
    { q: "Вы часто беретесь за новые дела, не закончив старые?", type: "sanguine" },
    { q: "Вы предпочитаете наблюдать за конфликтом со стороны?", type: "phlegmatic" },
    { q: "Вы часто действуете по первому импульсу, а потом жалеете?", type: "choleric" }
];

const results = {
    // Чистые типы
    "sanguine": { title: "Чистый Сангвиник", desc: "<b>В обществе:</b> Душа компании. Вы легко адаптируетесь к любым изменениям и умеете расположить к себе любого человека.", fact: "Вы обладаете самой гибкой нервной системой." },
    "choleric": { title: "Чистый Холерик", desc: "<b>В обществе:</b> Прирожденный лидер. Ваша энергия и страсть заставляют мир вокруг вас вращаться быстрее.", fact: "У вас самая высокая скорость реакции среди всех типов." },
    "phlegmatic": { title: "Чистый Флегматик", desc: "<b>В обществе:</b> Скала спокойствия. Вы — тот человек, на которого всегда можно положиться в трудную минуту.", fact: "Ваша работоспособность в монотонных делах бьет рекорды." },
    "melancholic": { title: "Чистый Меланхолик", desc: "<b>В обществе:</b> Глубокий эмпат. Вы чувствуете людей на подсознательном уровне и видите красоту в мелочах.", fact: "Ваша интуиция — ваш главный инструмент успеха." },
    
    // Смешанные типы (все 6 комбинаций)
    "choleric-sanguine": { title: "Холерик-Сангвиник", desc: "<b>Тип:</b> Харизматичный лидер. Вы сочетаете пробивную силу с невероятным обаянием. Вы не просто ведете людей, вы вдохновляете их." },
    "phlegmatic-sanguine": { title: "Сангвиник-Флегматик", desc: "<b>Тип:</b> Стабильный оптимист. Вы общительны, но при этом рассудительны. Редкое сочетание легкости и надежности." },
    "melancholic-sanguine": { title: "Сангвиник-Меланхолик", desc: "<b>Тип:</b> Творческий коммуникатор. Вы обладаете глубоким миром, но умеете открываться людям, принося в общение смысл." },
    "choleric-phlegmatic": { title: "Холерик-Флегматик", desc: "<b>Тип:</b> Стратегический деятель. Вы умеете вовремя «включить» энергию и вовремя «остыть» для анализа. Очень сильный тип." },
    "choleric-melancholic": { title: "Холерик-Меланхолик", desc: "<b>Тип:</b> Импульсивный творец. Ваша жизнь полна контрастов: от великой энергии до глубокой рефлексии. Вы создаете шедевры." },
    "melancholic-phlegmatic": { title: "Флегматик-Меланхолик", desc: "<b>Тип:</b> Мудрый наблюдатель. Ваше спокойствие дополнено тонкой интуицией. Вы видите суть вещей, не отвлекаясь на шум." }
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
    
    let key;
    // Если разница между 1 и 2 местом менее 15% от макс. возможных баллов (ок. 7 баллов при 20 вопр.)
    if (first[1] - second[1] < 7) {
        key = [first[0], second[0]].sort().join('-');
    } else {
        key = first[0];
    }
    
    const res = results[key] || results[first[0]];
    document.getElementById('result-title').innerText = res.title;
    document.getElementById('result-desc').innerHTML = `
        <p class="res-p">${res.desc}</p>
        <div class="fact-box">${res.fact || "Вы — уникальное сочетание черт, которое помогает вам адаптироваться к жизни."}</div>
    `;
}
updateUI();
