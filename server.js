const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Подключение к sql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'maxay_arbitrage' 
});

db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключение к базе данных успешно!');
    }
});

app.use(bodyParser.json());
app.use(express.static('public')); //Фронт

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


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
