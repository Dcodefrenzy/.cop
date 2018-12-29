const express = require('express');
var {mongoose} = require("../db/mongoose.js");
const {ObjectID} = require('mongodb');
var {admins} = require("./adminModel.js");
const _ = require('lodash');


exports.adminAuthenticate =  (req, res, next)=>{
		//requesting our token from header.
		var token = req.header('x-auth');
		admins.findByToken(token).then((admin)=>{
			if (!admin) {
				return promise.reject();
			}
			
			req.admin = admin;
			req.token = token;

			next();
	}).catch((e)=>{
		res.status(404).send("unauthorised person");
	});
}

exports.masterAdminAuthenticate =  (req, res, next)=>{
		//requesting our token from header.
		var token = req.header('x-auth');
		admins.findByToken(token).then((admin)=>{
			if (!admin) {
				return promise.reject();
			}
			if (admin.level !== 2) {
				return promise.reject();
			}
			req.admin = admin;
			req.token = token;

			next();
	}).catch((e)=>{
		res.status(404).send("unauthorised person");
	});
}


exports.addAdmin = (req, res)=>{
	var admin = new admins({
		email: req.body.email,
		name: req.body.name,
		level: req.body.level,
		password: req.body.password,		
	});


	admin.save().then((admin)=>{
		return admin.generateAuthToken();
	}).then((token)=>{
		res.status(200).header('x-auth', token).send(admin);
	
	}).catch((e)=>{
		res.status(404).send("unable to add");
	});
}

exports.viewAdmins = (req, res)=>{
	admins.find().then((doc)=>{
		res.status(200).json(doc);
	}).catch((e)=>{
		res.status(404).send("No admins");
	})
}

exports.adminLogin = (req, res)=>{
		var admin = new admins({
		email : req.body.email,
		password : req.body.password
	});
	admins.findByCredentials(admin.email, admin.password).then((admin)=>{
		return admin.generateAuthToken().then((token)=>{
			res.header('x-auth', token).send(admin);
		});
	}).catch((e)=>{
		res.status(400).send("unable to login");
	});

}

exports.updateAdmin = (req, res)=>{
	var id = req.params.id;
/*	console.log(id);
	res.status(200).send(id);*/
	var admin = new admins({
			email: req.body.email,
			level: req.body.level,
			name: req.body.name,
			
	});
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("err")
	}
	admins.findByIdAndUpdate(id, {$set: {name:admin.name, email:admin.email, level:admin.level,}}, {new: true}).then((body)=>{
		if (!body) {
			return res.status(404).send("unable to update");
		}
		res.status(200).send(body);
		
	}).catch((e)=>{
		res.status(404).send("unable to update");
	})
}

exports.deleteAdmin = (req, res)=>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("error no object id found");
	}
	admins.findByIdAndRemove(id).then((data)=>{
		if (!data) {
			return res.status(404).send("unable to delete admin");
		}
		res.status(200).send(data);
	}).catch((e)=>{
		res.status(404).send("e");
	})
}