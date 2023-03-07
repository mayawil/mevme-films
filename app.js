const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const ejs = require('ejs');

const app = express();
let port = 3000;
let host = 'localhost';

app.set('view engine', 'ejs');

// Array for photo locations 
let locations = [
    { id: 'fl', name: 'Florida', link:'locations/florida.html'},
    { id: 'ga', name: 'Georgia', link:'locations/georgia.html'},
    { id: 'nj', name: 'New Jersey', link:'locations/newjersey.html'},
    { id: 'ny', name: 'New York', link:'locations/newyork.html'},
    { id: 'nc', name: 'North Carolina', link:'locations/northcarolina.html'},
    { id: 'sk', name: 'South Korea', link:'locations/southkorea.html'},
    { id: 'wv', name: 'West Virginia', link:'locations/westvirigina.html'},
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Home page
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

// Locations page
app.get('/locations', (req, res) => {
    res.render('locations', {location: locations});
});

// Location page
app.get('/locations/:sid', (req, res) => {
    let id = req.params.sid;
    let location = locations.find(element => element.id === id);
    res.render('location', {location: location});
});

// About page
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

app.use((req, res, next) => {
    res.status(404).send('Page cannot be found');
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});