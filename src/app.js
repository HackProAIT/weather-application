const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000
const path = require('path')

//path for express config
const pub_dir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//setup static directory to serve
app.use(express.static(pub_dir))

//setup handle bars
app.set("view engine", 'hbs') //to setup handlebars engine
app.set('views', viewPath) //set up path to look folder for views 
hbs.registerPartials(partialPath) //to render partials inside .hbs files

app.get('',(req,res) => {
    res.render('index', {
        title : 'weather',
        name : 'john doe'
    }) //finds views folder and index.hbs in directory from where program is running from
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About me',
        name : 'john doe'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'help page',
        name : 'john doe',
        message : 'what can i help you with?'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'please provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={}) => {
        if(error)
            return res.send({error})
        forecast(longitude, latitude, (error, data) =>{
            if(error)
                res.send({error})
            res.send({
                  forecast : data,
                  location,
                  address : req.query.address  
                })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404 page',
        name : 'john doe'
    })
})

app.listen(port, () => {
    console.log('server running at port -> ' + port)
})