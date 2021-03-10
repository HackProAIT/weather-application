const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid29vZGdvcmRpYW4iLCJhIjoiY2swd2Rhb2poMGl0ZTNsbmQ1bDR4NXpvcCJ9.zStEE9hT_iLpS-x6NyQDXw&limit=1'
    request({url, json : true}, (error, {body}={}) => {
        if(error)
            callback('unable to connect to location service', undefined)
        else if(body.features.length == 0)
            callback('could not find this location, please re-enter the correct location.',undefined)
        else    
            callback(undefined, { 
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
    })
}

module.exports = geocode