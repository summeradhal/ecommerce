
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var mongoUrl="mongodb://localhost:27017/ecommerce";
var UserInfo=require('../models/ecommerce');
var bcrpty=require('bcrypt-nodejs');
mongoose.connect(mongoUrl);


//Register Router
router.post('/register',function(req,res,next){
	if(req.body.password != req.body.passwordConfirm){
        res.json({
            message: "passmatch"
        });
    }else{
        var newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            emailAddr: req.body.email
        });

        newUser.save();
        res.json({
            message: "added"
        });
    }
});

router.post('/login',function(req,res,next){
	User.findOne({
		username:req.body.username, //this is the droi were looking for
		function(error,document){
			//the document returned from our Mongo query ie the droid
			// the doc will have a property from each field wee need 
			// tocheck the password field in the db against the hashed bcrypt version
			if(documen==null){
				res.json({failer:"noUser"});

			}else{
				//run comparesync, first param is the english password, 2nd param is the hash
				//will return true if they are equal, false if they are not
				var loginResult=bcrypt.compareSync(req.body.password,document.password);
				if(loginResult){
					res.json({
						success:"userfound"
					});
				}else{
					//hashes did not match ore the doc wasnt found. goodbye
					res.json({
						failure:"badPass"
					})
				}
				}

			}
		}
	})
})




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;