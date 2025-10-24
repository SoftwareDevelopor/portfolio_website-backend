const mongoose = require('mongoose');
const ModalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    created_At:{
        type:Date,
        default: Date.now()
    },
    deleted_at:{
        type:Date,
        default:Date.now()
    }

}, { timestamps: true });
const ContactModal = mongoose.model('Contact', ModalSchema);
module.exports = ContactModal;