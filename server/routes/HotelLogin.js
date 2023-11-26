import express from "express";
import bcrypt, { hash } from 'bcrypt';
import Hotel from '../models/Hotel.js';
import Reward from "../models/reward.js";

const router = express.Router();

// Handling user signup

router.get('/', (req, res) => {
	res.send("Hello World")
})
router.post('/register', async (req, res) => {
	try {
		const { email, password, isAdmin } = req.body;
		const existingHotel = await Hotel.findOne({ email });

		if (existingHotel) {
			return res.status(400).json({ message: 'User already exists' });
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

		res.status(201).json({ message: 'Hotel registered successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
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
			return res.status(200).json({ message: 'User Authenticated', isAdmin: existingHotel.isAdmin, id: existingHotel._id, rewards: existingHotel.rewards });
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

//Handling client points 
router.put('/points/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {rewards, add} = req.body;

		//Validate updateRewards here

		const existingRewards = await Hotel.findById(id);
		console.log(existingRewards)

		if(!existingRewards){
			return res.status(404).json({message: 'Rewards not found'});
		}

		console.log(add)
		if (add) {
			existingRewards.rewards = existingRewards.rewards + rewards;
			if (existingRewards.rewards <= 0) {
				existingRewards.rewards = 0;
			}
		} else {
			existingRewards.rewards = existingRewards.rewards - rewards;
			if (existingRewards.rewards <= 0) {
				existingRewards.rewards = 0;
			}
		}

		//console.log(existingRewards)

		const saveReward = await existingRewards.save();
		
		res.status(200).json(saveReward);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to edit rewards', error: error.message });
	}
});


export default router;