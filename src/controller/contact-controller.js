const emailjs = require("@emailjs/browser");
const ContactModal = require("../Modal/ContactModal");
require("dotenv").config();

exports.createcontact = async (request, response) => {
  try {
    let contactData = request.body;

    const newContact = new ContactModal(contactData);
    await newContact
      .save()
      .then(async (result) => {
        try {
          const publicKey = process.env.PUBLIC_KEY;
          const serviceID = process.env.SERVICE_ID;
          const templateID = process.env.TEMPLATE_ID;
          const to_email = process.env.EMAIL;

          emailjs.init({
            publicKey: publicKey,
          });

          const templateParams = {
            name: result.name,
            email: result.email,
            message: result.message,
            to_email: to_email,
          };

          emailjs.send(serviceID, templateID, templateParams).then(
            (responseEmail) => {
              console.log("SUCCESS!", responseEmail.status, responseEmail.text);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );

          const obj = {
            _status: "success",
            message: "Contact created successfully!",
            data: result,
          };
          response.send(obj);
        } catch (error) {
          console.log(error);
        }
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
