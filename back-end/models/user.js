var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	password: String,
	emailAddr: String
	// token: String,
	// tokenExpDate:Date
});

module.exports = mongoose.model('User', User);