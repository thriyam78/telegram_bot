const request = require("request");

async function weatherUpdate(city) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: "https://api.api-ninjas.com/v1/weather?city=" + city,
        headers: {
          "X-Api-Key": process.env.WEATHER_API_KEY,
        },
      },
      function (error, response, body) {
        if (error) reject(error);
        else if (response.statusCode != 200) reject(body);
        else {
          try {
            const weatherData = JSON.parse(body);
            resolve({ weather: weatherData, city: city });
          } catch (parseError) {
            reject(parseError);
          }
        }
      }
    );
  });
}

module.exports = { weatherUpdate };
