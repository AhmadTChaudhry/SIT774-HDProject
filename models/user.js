const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
)`);

const createUser = (email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], callback);
    });
};

const findUserByEmail = (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return callback(err);
        callback(null, row);
    });
};

const findUserById = (id, callback) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) return callback(err);
        callback(null, row);
    });
};

module.exports = { createUser, findUserByEmail, findUserById };
