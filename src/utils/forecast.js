const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a323cb04a0f7a152cec071fda5b4cff9&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to the server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        rainChance: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
