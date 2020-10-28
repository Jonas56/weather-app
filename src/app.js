const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;


const pathToPublic = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


hbs.registerPartials(partialsPath);


app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.use(express.static(pathToPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        location: 'Rabat',
        name: 'Jonas Lord'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jonas Lord'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jonas Lord',
        help: 'This is the help page',
    })
});

app.get('/weather', (req, res) => {
    //Weather page

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided',
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error! ',
        message: 'Help article not found',
        name: 'Jonas Lord',
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error! ',
        message: 'Page not found ',
        name: 'Jonas Lord',
    })
});



app.listen(port, () => {
    console.log('Listening on port ' + port);
})