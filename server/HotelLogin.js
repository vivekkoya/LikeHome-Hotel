import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import LocalStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import { create } from "";
var app = express();

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
	const hotel = await create({
	emaail: req.body.email,
	password: req.body.password
	});

	return res.status(200).json(hotel);
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const hotel = await Hotel.findOne({ email: req.body.email });
		if (hotel) {
		//check if password matches
		const result = req.body.password === hotel.password;
		if (result) {
			//res.render("secret");
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "Hotel doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Handling user logout 
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}