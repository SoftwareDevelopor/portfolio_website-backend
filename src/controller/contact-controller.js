
const ContactModal = require("../Modal/ContactModal");
require("dotenv").config();

exports.createcontact = async (request, response) => {
  try {
    const contactData = request.body;
    const newContact = new ContactModal(contactData);
    
    try {
      const result = await newContact.save();
      response.status(200).send({
        _status: "success",
        message: "Contact created successfully!",
        data: result,
      });
    } catch (saveError) {
      console.error('Failed to save contact:', saveError);
      response.status(500).send({
        _status: "failed",
        message: "Failed to save your message",
        error: saveError.message
      });
    }
  } catch (error) {
    console.error('Contact creation error:', error);
    response.status(500).send({
      _status: "failed",
      message: "Contact creation failed!",
      error: error.message,
    });
  }
};
