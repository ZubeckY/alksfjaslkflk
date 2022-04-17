const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema ({
    name : {type: String, required: true},
    surname : {type: String, required: true},
    patronymic : {type: String, required: true},
    phone : {type: Number, required: true},
})

const Contacts = mongoose.model ('contacts', contactSchema);
module.exports = Contacts;
