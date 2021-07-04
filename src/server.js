const path = require('path');

const express = require('express');
const hbs = require('hbs');

const getWeather = require('./weather');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.render('weather', {
        title: "Weather",
        author: "Saurabh"
    });
})
app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "location not specified"
        })
        return;
    } else {
        try {
            const responseWeather = await getWeather(req.query.address);
            res.send({
                address: req.query.address,
                location: responseWeather.location,
                forecast: responseWeather.forecast
            })
        } catch (e) {
            res.send({
                error: e.message
            })
        }
    }
})
app.get('/help', (req, res) => {
    res.render('general', {
        title: "Help",
        message: "Hello Help",
        author: "Saurabh"
    });
})
app.get('/about', (req, res) => {
    res.render('general', {
        title: "About",
        message: "Hello About",
        author: "Saurabh"
    });
})
app.get("*", (req, res) => {
    res.render('error', {
        title: "404",
        message: "Page Not Found",
    });
})

app.listen(port, () => {
    console.log("Server started on port "+port);
});