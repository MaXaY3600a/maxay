const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Подключение к базе данных MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // ваш логин
    password: '', // ваш пароль
    database: 'maxay_arbitrage' // имя вашей базы данных
});

db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключение к базе данных успешно!');
    }
});

app.use(bodyParser.json());
app.use(express.static('public')); // Папка с фронтендом

// Маршрут для логина
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            res.status(500).send('Ошибка при проверке пользователя');
        } else if (result.length > 0) {
            res.status(200).send({ message: 'Успешный вход' });
        } else {
            res.status(401).send({ message: 'Неверный логин или пароль' });
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
