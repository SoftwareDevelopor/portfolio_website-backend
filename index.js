const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const corsOptions = {
  origin: 'https://portfoliowebsite-alpha-sooty.vercel.app/', // Replace with your actual frontend domain
  methods: ['GET', 'POST'], // Allow the methods your frontend uses
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Well, Server API is Connected!");
});

require("./src/router/contact-router.js")(app);

const mongodb=process.env.MONGODBURL
app.listen(8000, () => {
  mongoose
    .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
});
