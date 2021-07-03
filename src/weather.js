const fetch= require('node-fetch');

const getWeather = async (address) => {

    const location = await getLocation(address);
    const lon = location.features[0].center[1], lan = location.features[0].center[0];

    const forecast = await getForecast(lon, lan);

    return {
        location:location.features[0].place_name,
        forecast:forecast.current,
    };
}


const getLocation = async (locationInput) => {

    let location = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput)}.json?access_token=pk.eyJ1Ijoic3RyYW5nZWV2aWwwIiwiYSI6ImNrcWNjaXJnNTFpNjMycW12aXlwZDAwZ2UifQ.InEobjEltr4iEUA-ilKSQA&limit=1`).catch(e => { throw new Error("Network Issue") });
    if (!location.ok) {
        throw new Error("Server not working");
    }

    location = await location.json();
    if (location.features.length === 0) {
        throw new Error("Location not found");
    }
    return location;
}
const getForecast = async (lon, lan) => {

    let forecast = await fetch(`http://api.weatherapi.com/v1/current.json?key=617525a8b2d64619a01144735212406&q=${lon},${lan}`).catch(e => { throw new Error("Network Issue") });
    if (!forecast.ok) {
        throw new Error("Server not working");
    }

    forecast = await forecast.json();
    return forecast;
}
module.exports = getWeather;