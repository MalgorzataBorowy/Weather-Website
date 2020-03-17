const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `https://api.darksky.net/forecast/f6a14bd0948b2e1d16906b60d28032fd/${latitude},${longitude}?units=si`
    request({url,json: true},(error,{body}) => {
        if (error) {
            callback('Unable to connect',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const weatherLocation = body.timezone
            const data = `In ${weatherLocation} it is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. ${body.daily.data[0].summary}`
            callback(undefined,data)
        }
    })
}

module.exports = forecast