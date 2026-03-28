const questions = [
    { text: "Вы мгновенно реагируете на происходящее, часто не успев подумать?", type: "choleric" },
    { text: "Вам жизненно необходимо постоянно менять обстановку и круг общения?", type: "sanguine" },
    { text: "Вас практически невозможно вывести из себя даже в острых ситуациях?", type: "phlegmatic" },
    { text: "Вы замечаете тончайшие детали в поведении людей и остро на них реагируете?", type: "melancholic" },
    { text: "Ваша речь быстрая, эмоциональная и сопровождается активной мимикой?", type: "choleric" },
    { text: "Вы легко справляетесь с несколькими сложными делами одновременно?", type: "sanguine" },
    { text: "Вы долго обдумываете свои слова и поступки, прежде чем действовать?", type: "phlegmatic" },
    { text: "Мелкие неудачи способны надолго испортить вам настроение?", type: "melancholic" },
    { text: "Вы склонны к риску и часто берете на себя роль лидера?", type: "choleric" },
    { text: "Вы быстро забываете обиды и легко прощаете людей?", type: "sanguine" },
    { text: "Вам важнее всего стабильность, предсказуемость и тишина?", type: "phlegmatic" },
    { text: "Вы часто чувствуете острую потребность побыть в одиночестве?", type: "melancholic" },
    { text: "Вы часто перебиваете собеседника из-за избытка идей или эмоций?", type: "choleric" },
    { text: "Вы предпочитаете яркие впечатления глубокому анализу ситуации?", type: "sanguine" },
    { text: "Вы можете долго заниматься рутинной работой, не теряя концентрации?", type: "phlegmatic" },
    { text: "Вы склонны искать скрытый смысл в словах окружающих?", type: "melancholic" },
    { text: "Ваше настроение может резко упасть без видимой причины?", type: "melancholic" },
    { text: "Вы часто действуете по первому импульсу, о чем потом жалеете?", type: "choleric" },
    { text: "Вы предпочитаете наблюдать за конфликтом со стороны, а не участвовать?", type: "phlegmatic" },
    { text: "Вы легко приспосабливаетесь к любым изменениям в жизни?", type: "sanguine" }
];

const resultsData = {
    "sanguine": { t: "Сангвиник", p: "Живой, жизнерадостный человек. Быстро адаптируется к новому.", s: "Душа компании. Вы мастер коммуникации.", c: "Продажи, PR, ивенты." },
    "choleric": { t: "Холерик", p: "Энергичный, страстный и решительный. Склонен к бурным эмоциям.", s: "Прирожденный лидер. Люди идут за вашей уверенностью.", c: "Управление, бизнес, спорт." },
    "phlegmatic": { t: "Флегматик", p: "Невозмутимый и спокойный. Обладает завидным упорством.", s: "Островок стабильности. Надежный и рассудительный друг.", c: "Аналитика, IT, инженерия." },
    "melancholic": { t: "Меланхолик", p: "Вдумчивый и чувствительный. Мастер деталей и глубоких смыслов.", s: "Тонкий эмпат. Выбирает узкий круг преданных друзей.", c: "Творчество, наука, психология." },
    "phlegmatic-sanguine": { t: "Сангвиник-Флегматик", p: "Спокойный оптимист. Баланс легкости и надежности.", s: "Вы общительны, но очень рассудительны.", c: "Универсал: и переговоры, и глубокая работа." },
    "choleric-sanguine": { t: "Холерик-Сангвиник", p: "Неиссякаемый источник энергии. Драйв и позитив в одном флаконе.", s: "Самый харизматичный тип. Ведете людей за собой играючи.", c: "Стартапы, шоу-бизнес, политика." },
    "choleric-melancholic": { t: "Холерик-Меланхолик", p: "Сложный тип: страсть холерика встречается с глубиной меланхолика.", s: "Вы можете быть резким, но ваши чувства всегда искренни.", c: "Режиссура, глубокое искусство, аудит." },
    "melancholic-phlegmatic": { t: "Флегматик-Меланхолик", p: "Тихий аналитик. Ваше спокойствие — результат глубокого понимания жизни.", s: "Мудрый наблюдатель. К вам приходят за самым точным советом.", c: "Архитектура, программирование, исследования." }
};

let current = 0;
let scores = { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 };

function render() {
    const app = document.getElementById('app');
    if (current < questions.length) {
        app.innerHTML = `
            <span class="q-header">Вопрос ${current + 1} из ${questions.length}</span>
            <h2>${questions[current].text}</h2>
            <div class="options">
                <button class="opt-btn" onclick="next(1)"><span>1</span> Да, точно</button>
                <button class="opt-btn" onclick="next(2)"><span>2</span> Похоже на меня</button>
                <button class="opt-btn" onclick="next(3)"><span>3</span> Сомневаюсь</button>
                <button class="opt-btn" onclick="next(4)"><span>4</span> Не совсем</button>
                <button class="opt-btn" onclick="next(5)"><span>5</span> Точно нет</button>
            </div>
        `;
    } else {
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const f = sorted[0][0]; const s = sorted[1][0];
        const isMix = (sorted[0][1] - sorted[1][1] < 8);
        let key = isMix ? [f, s].sort().join('-') : f;
        const res = resultsData[key] || resultsData[f];

        app.innerHTML = `
            ${isMix ? '<span class="mix-label">ВАШ МИКС:</span>' : ''}
            <h1 class="res-title">${res.t}</h1>
            <div class="scroll-area">
                <div class="block"><h4>Портрет</h4><p>${res.p}</p></div>
                <div class="block"><h4>В обществе</h4><p>${res.s}</p></div>
                <div class="block"><h4>Карьера</h4><p>${res.c}</p></div>
            </div>
            <button class="reset-btn" onclick="location.reload()">Пройти заново</button>
        `;
    }
}

window.next = (v) => { scores[questions[current].type] += (6 - v); current++; render(); };
document.addEventListener('DOMContentLoaded', render);
