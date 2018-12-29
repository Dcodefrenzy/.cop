const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require('lodash');



var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlenght: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{value} is not a valid email',
		},
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlenght:1,
	},
	phonenumber: {
		type: String,
		trim:true,
		required: true,
		
	},
	gender:{
		type: String,
		required: true,
		trim: true,
		minlenght:1,
	},

	password: {
		type: String,
		required: true,
		trim: true,
		minlenght: 6,
	},
	userstatus: {
		type :String,
		required: true,
		trim: true,
		minlenght:1,
	},
	startdate:{
		type: String,
		required:true,
	},
	_adminid:{
		type: mongoose.Schema.Types.ObjectId,
		trim: true,
		required:true,
	},
	tokens: [{
		access:{
			type: String,
				
		},
		token: {
			type: String,
						
		}
	}]
});


	userSchema.pre('save', function(next){
		var user = this;

		if (user.isModified('password')) {
			bcrypt.genSalt(10, (err, salt)=>{
				bcrypt.hash(user.password, salt, (err, hash)=>{
					user.password = hash;
					next();
				});
			});
		}else{
			next();
		}
	});

	userSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email', 'name',  'phonenumber', 'gender', 'userstatus']);
};


		//creating an authentication token for user
	userSchema.methods.generateAuthToken = function(){
		//this keyword represent the object that uses this method.
		var user = this;
		var access = 'auth';
		//using the user id to generate a token which will expire.
		var token = jwt.sign({_id: user._id.toHexString(), access}, 'mongsufsrenz##').toString();
		//adding the token and access to the database usng array push method.
		user.tokens.push({access, token});	
		return user.save().then(()=>{
			return token;
		});
	};

	userSchema.statics.findByCredentials = function (email, password){
	var user = this;
	return user.findOne({email}).then((body)=>{
		if (!body) {
			return Promise.reject();
		}
		return new Promise((resolve, reject)=>{
			bcrypt.compare(password, body.password, (err, res)=>{
				if (res) {
					resolve(body);
				}else{
					reject();
				}	
			})
		})
	})
}


	//find by token
	userSchema.statics.findByToken = function(token){
		var user = this;
		var decode;
		try{
			decode = jwt.verify(token, 'mongsufsrenz##');
		}catch(e){
			return new Promise((resolve, reject)=>{
				return reject();
			});
		}	
		return user.findOne({
			'_id':decode._id,
			'tokens.token': token,
			'tokens.access': 'auth',
		});
	}



var users = mongoose.model('users', userSchema);

module.exports = {users};
