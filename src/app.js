const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express configuration
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Małgorzata Borowy'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Małgorzata Borowy'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'Help page - some message',
        name: 'Małgorzata Borowy'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send([{
                address: req.query.address,
                forecast: forecastData,
                location
            }])
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.key) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.key)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error404',{
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Małgorzata Borowy'
    })
})

app.get('*', (req,res) => {
    res.render('error404',{
        title: 'Error 404',
        message: 'Page not found',
        name: 'Małgorzata Borowy'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})