const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware для обработки URL-кодированных данных
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка подключения к базе данных
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Hotel',
    password: 'postgres',
    port: 5432,
});

// Подключение к базе данных
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

// Обработка GET-запроса для отображения формы
app.get('/', (req, res) => {
    res.send(`
        <form action="/book" method="POST">
            <label for="fullName">Полное имя:</label>
            <input type="text" id="fullName" name="fullName" required><br><br>
            <label for="email">Электронная почта:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="phone">Телефон:</label>
            <input type="tel" id="phone" name="phone" required><br><br>
            <label for="checkIn">Дата заезда:</label>
            <input type="date" id="checkIn" name="checkIn" required><br><br>
            <label for="checkOut">Дата выезда:</label>
            <input type="date" id="checkOut" name="checkOut" required><br><br>
            <label for="guests">Количество гостей:</label>
            <input type="number" id="guests" name="guests" required min="1"><br><br>
            <button type="submit">Забронировать</button>
        </form>
    `);
});

// Обработка POST-запроса от формы бронирования
app.post('/book', (req, res) => {
    const { fullName, email, phone, checkIn, checkOut, guests, specialRequests } = req.body;

    const query = `
        INSERT INTO bookings (full_name, email, phone, check_in, check_out, guests, special_requests)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    const values = [fullName, email, phone, checkIn, checkOut, guests, specialRequests];

    client.query(query, values)
        .then(() => {
            res.send('Бронирование успешно!');
        })
        .catch(err => {
            console.error('Ошибка при вставке данных', err);
            res.status(500).send('Ошибка при обработке бронирования');
        });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});