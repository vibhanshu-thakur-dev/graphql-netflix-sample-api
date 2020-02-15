const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: String,
    castIds: [String],
    country: String,
    directorIds: [String],
    dateAdded: String,
    releaseYear: String,
    rating: String,
    categoryIds : [String],
    description: String,
    typeId : String
})

module.exports = mongoose.model('Content',contentSchema);
