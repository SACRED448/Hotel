const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Импортируем cors
const path = require('path');

// Инициализация приложения Express
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware
app.use(cors()); // Включаем CORS для всех маршрутов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Hotel',
    password: 'postgres',
    port: 5432,
});

// Маршрут для обработки отправки формы
app.post('/submit', async (req, res) => {
    const { full_name, email, phone, check_in, check_out, guests, special_requests } = req.body;
    // console.log(req.body);
    try {
        const result = await pool.query(
            'INSERT INTO bookings (full_name, email, phone, check_in, check_out, guests, special_requests) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [full_name, email, phone, check_in, check_out, guests, special_requests]
        );
        res.status(201).send('бронирование успешно выполнено!');
    } catch (err) {
        console.error(err);
        res.status(500).send('ошибка при сохранении бронирования');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});