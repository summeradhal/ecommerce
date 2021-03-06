var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/ecommerce";
// var stripe = require("stripe")(
//   "sk_test_7yh9oRYA9m9gd8d3gXceUMXy"
// );
// var stripe=require('stripe')(config.secretTestKey);
//this is our config modulewe have access to
//configVars.secretTestKey
// var config=require('../config/config'); 

mongoose.connect(mongoUrl);
var User = require('../models/user');
//Include bcrpyt to store hashsed pass
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token').uid;

router.post('/register', function(req, res, next) {
  User.findOne(
		{username: req.body.username}, //This is teh droid we;re looking for
		function (error, document){
			if(document==null){
				res.json({failure:'badToken'})
			}else{

			}
});


   if(req.body.password != req.body.confirmPassword){
		res.json({
			message: "passmatch"
		});
	}else{
		var token=randToken(32);
		var newUser = new User({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddr: req.body.email,
			token:token
			//add token exp date
		});


	newUser.save(function(error,documentAdded){
			if(error){
				res.json({
					message:"errorAdding"
				});
			}else{

				res.json({
				message: "added",
				token:token
			});
			}
		});
		
	}
});

router.post('/login', function(req, res, next){
	User.findOne(
		{username: req.body.username}, //This is teh droid we;re looking for
		function (error, document){
			//document is teh document returned from our Mongo query... ie, the droid.
			//The docuemtn will ahve a property for each field. We need to check the passwrod field
			// in the DB against the hashed bcrypt version
			if(document == null){
				//No match
				res.json({failure:"noUser"});
			}else{
				//Run comparesync. First param is the english password, second param is the hash. It will return
				//true if they are equal, false if not.

				var loginResult = bcrypt.compareSync(req.body.password, document.password);
				var token = randToken(32);
				var date = Date.now();
				var tokenExpDate = date + (30);
				if(loginResult){

					//The password is correct. Log them in.
					User.update({username: document.username}).exec();
						// ,{token: token, tokenExpDate: tokenExpDate})
					res.json({
						success:"userFound",
						username:document.username,
						// token:token,
						// tokenExpDate:tokenExpDate
					});

					
				}else{
					//hashes did not match or teh doc wasn't found. Goodbye.
					res.json({
						failure: "badPass"
					});
				}
			}
		}
	)
});



router.get('/getUserData',function(req,res,next){
	var userToken=req.query.token; // the XXX in ?token=XXX
	if(userToken==undefined){
		//no token was supplied 
		res.json({failure:"noToken"})
	}else{
		User.findOne(
		{userToken:token}, //this is the droid we are looking for
		function(error,document){
			if(document==null){
				res.json({failure:'badToken'});
			}else{
				res.json({
				username:document.username,
				token:document.token
				})//document.username. break it down so it doesnt send everything
			}

		}
		)
	}
})
// router.post('/options',function(req,res,next){
// 	var newGame = new Games({
// 			gameName:req.body.gameName
// 		});

// 		newGame.save();
// 		res.json({
// 			message: "added game"
// 		});
// })


// router.post('/stripe',function(req,res,next){

// stripe.charges.create({
//  amount: 2000,
//  currency: "usd",
//  source: req.body.token, // obtained with Stripe.js
//  description: "Charge for elijah.miller@example.com"
// }).then((charge)=>{
// 	res.json({
// 		success:"Paid"
// 	}, function(err) {
// 		res.json({
// 			failure:"failedPayment"
// 		})
//  // asynchronously called
// });
// })

module.exports = router;




