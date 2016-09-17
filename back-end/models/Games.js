var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Games = new Schema({
	gameName: String
	// token: String,
	// tokenExpDate:Date
});

module.exports = mongoose.model('Games', Games);