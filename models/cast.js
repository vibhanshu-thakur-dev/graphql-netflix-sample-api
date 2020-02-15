const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const castSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Cast',castSchema);