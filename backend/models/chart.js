const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
    month :  String,
    number_of_posts: Number
});

module.exports = mongoose.model('charts',chartSchema)