const request = require('request');



const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9uYXM1NiIsImEiOiJja2dqZjRsNGgwdXdrMzNxbnZubnE4NHB1In0.xdZZcsKwpHqaGpv2MPB8OQ&limit=1'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to log to the mapBox service!', undefined)
        } else if (body.message) {
            callback('Unable to find the location. Please try again!', undefined);
        } else if (body.features.length) {
            const features = body.features[0];
            callback(undefined,
                {
                    latitude: features.center[1],
                    longitude: features.center[0],
                    location: features.place_name,
                })

        } else {
            callback('Unable to find location. Please try again!', undefined);
        }
    })

}

module.exports = geocode;