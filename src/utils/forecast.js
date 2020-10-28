const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si';


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Location not found. Please try again!', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '° out.' + ' There\'s ' + body.currently.precipProbability + '% chance to rain.')
        }
    });
}


module.exports = forecast;