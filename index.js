///////////////////////////////////////////////////////////////////////////////////
////////////////////////Setup and Initialization//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const initializePassport = require('./config/passport-config');
const { createUser, findUserByEmail } = require('./models/user');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

// Form Database Setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
const db = new sqlite3.Database('./queries.db');
db.run(`CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    number TEXT NOT NULL,
    query TEXT NOT NULL
)`);

// Form Handler
app.post('/submit-query', (req, res) => {
    const { name, number, query } = req.body;
    db.run('INSERT INTO queries (name, number, query) VALUES (?, ?, ?)', [name, number, query], (err) => {
        if (err) {
            req.flash('error', 'Failed to save query');
            return res.status(500).send('Failed to save query');
        }
        req.flash('success', 'Query recorded successfully, someone will get back to you.');
    });
});

// Initialize Passport
initializePassport(passport);
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new (require('connect-sqlite3')(session))({ db: 'sessions.db' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Request Handlers//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

app.get('/features', (req, res) => {
    res.render('features', { user: req.user });
});

app.get('/register', (req, res) => {
    res.render('register', { user: req.user });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', 'Please Register.');
            return res.redirect('/register');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    findUserByEmail(email, (err, user) => {
        if (user) {
            req.flash('error', 'Email is already registered.');
            res.redirect('/register');
        } else {
            createUser(email, password, (err) => {
                if (err) {
                    req.flash('error', 'Error creating user.');
                    return res.redirect('/register');
                }
                res.redirect('/login');
            });
        }
    });
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.get('/queries', (req, res) => {
    db.all('SELECT * FROM queries', (err, rows) => {
        if (err) {
            return res.status(500).send('Failed to retrieve queries');
        }
        res.render('queries', { queries: rows });
    });
});

// Fetching Data From API
const fetchDataWithDelay = async (url, params = {}) => {
    const options = {
        method: 'GET',
        url: url,
        params: params,
        headers: {
            'X-RapidAPI-Key': 'e3e920a6cdmshb9e4aec2a2f6662p154da6jsnc385dad68693',
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    await new Promise(resolve => setTimeout(resolve, 10));
    return response.data;
};

app.get('/cars', async (req, res) => {
    try {
        const cars = await fetchDataWithDelay('https://car-data.p.rapidapi.com/cars', { limit: '20', page: '0' });

        res.render('cars', { cars, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching car data');
    }
});

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Server Setup////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
