const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Saba",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "Saba",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help's on it's way",
    title: "Help",
    name: "Saba",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address was provided",
    });
  }
  geocode(req.query.address, (err, { lat, long, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        temperature: forecastData.temp,
        chanceOfRain: forecastData.rainChance,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saba",
    error: "Couldn't find help article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Saba",
    error: "Error 404 page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
