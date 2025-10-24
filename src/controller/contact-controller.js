
const ContactModal = require("../Modal/ContactModal");
require("dotenv").config();

exports.createcontact = async (request, response) => {
  try {
    let contactData = request.body;

    const newContact = new ContactModal(contactData);
    await newContact
      .save()
      .then((result) => {
        const obj = {
          _status: "success",
          message: "Contact created successfully & Email has started sending..!",
          data: result,
        };
        response.send(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    const obj = {
      _status: "failed",
      message: "Contact creation failed!",
      error: error,
    };
    response.send(obj);
  }
};
