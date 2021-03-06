const express = require('express');
var {mongoose} = require("../db/mongoose.js");
const {ObjectID} = require('mongodb');
var {users} = require("./usersModel.js");
const _ = require('lodash');


exports.userAuthenticate =  (req, res, next)=>{
		//requesting our token from header.
		var token = req.header('u-auth');
		users.findByToken(token).then((body)=>{
			if (!body) {
				return promise.reject();
			}

			req.user = body;
			req.token = token;

			next();
	}).catch((e)=>{
		res.status(400).send("unauthorised person");
	});
}


//Only admins can register users.
exports.adduser = (req, res)=>{
	var user = new users({
		email: req.body.email,
		name: req.body.name,
		phonenumber: req.body.phonenumber,
		gender: req.body.gender,
		password: req.body.password,
		userstatus: req.body.userstatus,
		startdate: new Date,
		_adminid: req.admin._id,		
	});
	user.save().then((user)=>{
		
		return user.generateAuthToken();

	}).then((token)=>{
		res.status(200).send(user);
	
	}).catch((e)=>{
		res.status(404).send("unable to add");
	});
	
}

//Returns conllections of users for only admin.
exports.viewusers = (req, res)=>{
	var userstatus = "active";
	users.find({userstatus}).then((doc)=>{
		res.status(200).send(doc);
	}).catch((e)=>{
		res.status(404).send("No users");
	})
}

//returns a document of user.
exports.getuser =(req, res)=>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
	return res.status(404).send("error no object id found");
	}
	users.findById(id).then((user)=>{
		if (!user) {
			res.status(404).send("No user found");
		}
		res.status(200).send(user);
	}).catch((e)=>{
		res.status(404).send(e)
	})
}

exports.userLogin = (req, res)=>{
		var user = new users({
		email : req.body.email,
		password : req.body.password
	});
	users.findByCredentials(user.email, user.password).then((user)=>{
		return user.generateAuthToken().then((token)=>{
			res.header('u-auth', token).send(user);
		});
	}).catch((e)=>{
		res.status(400).send("unable to login");
	});

}

exports.updateuser = (req, res)=>{
	var id = req.params.id;
/*	console.log(id);
	res.status(200).send(id);*/
	var user = new users({
			email: req.body.email,
			phonenumber: req.body.phonenumber,
			gender: req.body.gender,
			userstatus: req.body.userstatus,
			name: req.body.name,
			startdate: req.body.date,	
	});
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("err")
	}
	users.findByIdAndUpdate(id, {$set: {name:user.name, email:user.email, level:user.level,}}, {new: true}).then((body)=>{
		if (!body) {
			return res.status(404).send("unable to update");
		}
		res.status(200).send(body);
	}).catch((e)=>{
		res.status(404).send("unable to update");
	})
}

exports.deleteuser = (req, res)=>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("error no object id found");
	}
	users.findByIdAndRemove(id).then((data)=>{
		if (!data) {
			return res.status(404).send("unable to delete user");
		}
		res.status(200).send(data);
	}).catch((e)=>{
		res.status(404).send("e");
	})
}

exports.retireUsers = (req, res)=>{
	var id = req.params.id;
		var user = req.body.userstatus;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("Error unauthorised Assess");
	}
	users.findByIdAndUpdate(id, {$set: {userstatus: user}}, {new: true}).then((body)=>{
		if (!body) {
			res.status(404).send("User do not exist");
		}
		res.status(200).send(body);
	}).catch((e)=>{
		res.status(404).send("Error");
	});
}