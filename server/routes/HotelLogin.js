import express from "express";
import bcrypt, { hash } from 'bcrypt';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Handling user signup

router.get('/', (req, res) => {
	res.send("Hello World")
})
router.post('/register', async (req, res) => {
	try {
		const {email, password, isAdmin} = req.body;
		const existingHotel = await Hotel.findOne({email});

		if (existingHotel) {
			return res.status(400).json({message: 'User already exists'});
		 }

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newHotel = new Hotel({
			email,
			password: hashedPassword,
			isAdmin,
		})
		console.log(newHotel)

		await newHotel.save();

		res.status(201).json({message: 'Hotel registered successfully'});
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});

//Handling user login
router.post('/login', async (req, res) => {
	console.log('recieved request')
	try {
		const { email, password } = req.body;
		const existingHotel = await Hotel.findOne({ 'email': email }).lean();
	
		if (!existingHotel) {
		  return res.status(404).json({ message: 'User Does not exist' });
		}
	
		const passwordMatches = await bcrypt.compare(password, existingHotel.password);
	
		if (passwordMatches) {
		  return res.status(200).json({ message: 'User Authenticated', isAdmin: existingHotel.isAdmin });
		} else {
		  return res.status(403).json({ message: 'Incorrect Password' });
		}
	  } catch (error) {
		res.status(500).json({ message: error.message });
	  }

	//authenticate
	// const username = req.body.email
	// const user = { name: username }

	// const accessToken = jwt.sign(user, 'this is a secret')
	// res.json({ accessToekn: accessToken })

});

//Handling user logout 
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

export default router;