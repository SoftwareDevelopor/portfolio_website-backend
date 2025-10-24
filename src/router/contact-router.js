const express = require('express');
const { createcontact } = require("../controller/contact-controller.js");

const router = express.Router();

module.exports = (app) => {
  router.post("/contact", createcontact);

  app.use("/api", router);
};
