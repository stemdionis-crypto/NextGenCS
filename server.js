const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Тестовый маршрут
app.get('/api/status', (req, res) => {
    res.json({ message: "Backend NextGen работает!", status: "online" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});