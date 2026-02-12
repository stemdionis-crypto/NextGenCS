// ==========================================
// 1. ДАННЫЕ ПРОЕКТА
// ==========================================

const serversData = [
    { name: "Classic Public", img: "images/public.jpg", online: "0/64", ip: "123.456.78.9:27015", desc: "Классический CS2 без лишних модов. Стабильный FPS, качественный античит и отзывчивая администрация." },
    { name: "Only AWP", img: "images/awp.jpg", online: "0/32", ip: "123.456.78.9:27016", desc: "Только снайперские винтовки. Тренируй свою реакцию и точность в дуэлях с лучшими стрелками." },
    { name: "Cyber Sport", img: "images/cyber.png", online: "0/10", ip: "123.456.78.9:27017", desc: "Соревновательный режим 5x5. Играй по правилам профессиональной сцены с тикрейтом 128." },
    { name: "Minigames", img: "images/mini.jpg", online: "0/20", ip: "123.456.78.9:27018", desc: "Огромный выбор карт: от паркура до пряток. Идеальное место, чтобы отдохнуть от стрельбы." },
    { name: "Deathmatch", img: "images/dm.jpg", online: "0/32", ip: "123.456.78.9:27019", desc: "Мгновенное возрождение. Выбирай любое оружие и оттачивай стрельбу в режиме 'каждый сам за себя'." },
    { name: "Surf + RPG", img: "images/surf.jpg", online: "0/40", ip: "123.456.78.9:27020", desc: "Скользи по рампам и прокачивай своего персонажа. Уникальная RPG система с магией и навыками." },
    { name: "Zombie Mod", img: "images/zombie.jpg", online: "0/50", ip: "123.456.78.9:27021", desc: "Выживи в мире зомби-апокалипсиса. Разнообразные классы зомби и укрепления для людей." },
    { name: "Arena 1v1", img: "images/arena.jpg", online: "0/10", ip: "123.456.78.9:27022", desc: "Докажи свое превосходство в честном бою один на один. Победитель поднимается в арену выше." },
    { name: "Retake", img: "images/retake.jpg", online: "0/12", ip: "123.456.78.9:27023", desc: "Отработка ситуаций после установки бомбы. Быстрые раунды для тренировки командной игры." }
];

const shopItems = [
    { id: 1, name: "VIP STATUS", price: 1500, desc: "Скины, уникальный префикс, иммунитет" },
    { id: 2, name: "PREMIUM", price: 3000, desc: "Все функции VIP + Админ-панель" },
    { id: 3, name: "РАЗБАН", price: 1000, desc: "Моментальное снятие бана" }
];

// ==========================================
// 2. ЛОГИКА КОШЕЛЬКА И МАГАЗИНА
// ==========================================

let userBalance = parseFloat(localStorage.getItem('balance')) || 0;

function updateBalanceDisplay() {
    const badge = document.querySelector('.balance-badge');
    if (badge) badge.innerText = `${userBalance} ₸`;
}

function buyItem(id) {
    const item = shopItems.find(i => i.id === id);
    if (userBalance >= item.price) {
        userBalance -= item.price;
        localStorage.setItem('balance', userBalance);
        updateBalanceDisplay();
        alert(`Поздравляем! Вы приобрели ${item.name}.`);
    } else {
        alert("Недостаточно средств. Пополните баланс!");
    }
}

// ==========================================
// 3. УПРАВЛЕНИЕ ДЕТАЛЯМИ СЕРВЕРА
// ==========================================

function openServerDetails(index) {
    const server = serversData[index];
    const modal = document.getElementById('server-details-modal');
    
    document.getElementById('sd-image').style.backgroundImage = `url('${server.img}')`;
    document.getElementById('sd-name').innerText = server.name;
    document.getElementById('sd-online').innerText = `Онлайн: ${server.online}`;
    document.getElementById('sd-ip-display').innerText = `IP: ${server.ip}`;
    document.getElementById('sd-desc').innerText = server.desc;
    
    document.getElementById('sd-connect-link').href = `steam://connect/${server.ip}`;
    
    const copyBtn = document.getElementById('sd-copy-btn');
    copyBtn.innerHTML = "КОПИРОВАТЬ IP";
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(server.ip);
        copyBtn.innerHTML = "СКОПИРОВАНО!";
        setTimeout(() => copyBtn.innerHTML = "КОПИРОВАТЬ IP", 2000);
    };

    modal.style.display = 'flex';
}

function closeServerDetails() {
    document.getElementById('server-details-modal').style.display = 'none';
}

// ==========================================
// 4. ГЕНЕРАЦИЯ КОНТЕНТА
// ==========================================

function createCard(server, index) {
    return `
        <div class="server-card" onclick="openServerDetails(${index})">
            <div class="card-thumb" style="background-image: url('${server.img}');"></div>
            <h3>${server.name}</h3>
            <p style="font-size: 11px; color: #777; margin-bottom: 10px; height: 26px; overflow: hidden;">
                ${server.desc.substring(0, 50)}...
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge">Онлайн: ${server.online}</span>
                <span style="font-size: 10px; color: var(--primary); text-transform: uppercase;">Подробнее</span>
            </div>
        </div>
    `;
}

// ==========================================
// 5. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ==========================================

window.onload = () => {
    const topThreeGrid = document.querySelector('.top-three');
    const allNineGrid = document.querySelector('.all-nine');
    const shopGrid = document.getElementById('shop-items');

    if (topThreeGrid) {
        for(let i = 0; i < 3; i++) topThreeGrid.innerHTML += createCard(serversData[i], i);
    }

    if (allNineGrid) {
        serversData.forEach((srv, index) => allNineGrid.innerHTML += createCard(srv, index));
    }

    if (shopGrid) {
        shopItems.forEach(item => {
            shopGrid.innerHTML += `
                <div class="shop-card">
                    <h3>${item.name}</h3>
                    <p style="color: #888; font-size: 14px; margin-bottom: 15px;">${item.desc}</p>
                    <span class="price-tag">${item.price} ₸</span>
                    <button class="btn-main" onclick="buyItem(${item.id})" style="width: 100%">КУПИТЬ</button>
                </div>
            `;
        });
    }

    // Лидеры (пустая таблица)
    const leadersContainer = document.getElementById('leaders-list');
    if (leadersContainer) {
        let rows = "";
        for (let i = 1; i <= 10; i++) rows += `<tr><td>#${i}</td><td>Ожидание данных...</td><td>-</td><td>-</td><td>-</td></tr>`;
        leadersContainer.innerHTML = `<table class="leaders-table"><thead><tr><th>МЕСТО</th><th>ИГРОК</th><th>УБИЙСТВА</th><th>СМЕРТИ</th><th>K/D</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // Авторизация
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
        document.getElementById('auth-zone').innerHTML = `
            <div class="user-profile-head">
                <div class="balance-badge" onclick="document.getElementById('deposit-modal').style.display='flex'" style="cursor:pointer">${userBalance} ₸</div>
                <span class="user-name-text">${savedUser}</span>
                <div class="user-avatar-small"></div>
                <button onclick="localStorage.clear();location.reload()" class="logout-mini">Выход</button>
            </div>
        `;
    }
};

// ==========================================
// 6. НАВИГАЦИЯ И МОДАЛКИ
// ==========================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const target = link.dataset.page;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        if (!link.classList.contains('logo')) link.classList.add('active');
        const targetPage = document.getElementById(`page-${target}`);
        if (targetPage) targetPage.classList.add('active');
    };
});

// Логин
if (document.getElementById('login-trigger')) {
    document.getElementById('login-trigger').onclick = () => document.getElementById('modal').style.display = 'flex';
}
if (document.getElementById('close-modal')) {
    document.getElementById('close-modal').onclick = () => document.getElementById('modal').style.display = 'none';
}

document.getElementById('confirm-login').onclick = () => {
    const nick = document.getElementById('user-input').value;
    if (nick.trim()) {
        localStorage.setItem('username', nick);
        if (!localStorage.getItem('balance')) localStorage.setItem('balance', '0');
        location.reload();
    }
};

// Пополнение
document.getElementById('confirm-deposit').onclick = () => {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (amount > 0) {
        userBalance += amount;
        localStorage.setItem('balance', userBalance);
        updateBalanceDisplay();
        document.getElementById('deposit-modal').style.display = 'none';
        alert(`Баланс пополнен на ${amount} ₸`);
    }
};

// Функции для VIP-туториала
function showVipTutorial() { document.getElementById('vip-tutorial-modal').style.display = 'flex'; }
function closeVipTutorial() { document.getElementById('vip-tutorial-modal').style.display = 'none'; }