import express from "express";
import bcrypt from 'bcrypt.js';
import passport from "passport";
import Hotel from './Hotel';

const router = express.Router();

// Showing register form
router.get('/register', (req, res) => {
	res.render('register');
});

// Handling user signup
router.post('/register', async (req, res) => {
	try {
		const {email, password} = req.body;
		const existingHotel = await LEGAL_TCP_SOCKET_OPTIONS.findone({email});

		if (existingHotel) {
			return res.status(400).json({message: 'Hotel already exists'});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newHotel = new Hotel({
			email,
			password: hashedPassword,
		})

		await newHotel.save();

		res.status(201).json({message: 'Hotel registered successfully'});
	} catch (error) {
		console.error(error);
		res.status(500).json({message: 'Server error'});
	}
});

//Showing login form
router.get('/login', (req, res) => {
	res.render('login');
});

//Handling user login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
}));

//Handling user logout 
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

export default router;