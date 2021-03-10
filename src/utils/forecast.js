const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=f8c3d6ce3e06f3c35f6caf2620084772&query=' + latitude + ',' + longitude
    request({url, json : true,},(error, {body}={}) => {
        if(error)
            callback('unable to connect weather services')
        else if(body.error)
            callback('wrong location')
        else 
            callback(undefined, body.current.weather_descriptions)
    })
}

module.exports = forecast