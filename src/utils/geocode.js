const request = require('request')
const geocode = (adress,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoibWFsYm9yb3d5IiwiYSI6ImNrN3JxMzVrbTBld3IzbXF0MnV3OG43OWoifQ.enLL1zgeO49cmKlUYffblQ&limit=1`
    request({url,json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (body.message) {
            callback('URL error',undefined)
        } else if (body.features.length===0) {
            callback('Unable to find location',undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            }
            callback(undefined,data)
        }       
    })
}

module.exports = geocode