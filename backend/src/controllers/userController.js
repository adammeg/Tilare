const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    // Signup
    async signup(req, res) {
        try {
            // Check if user already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).send('User already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create new user
            user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
            });

            await user.save();

            res.status(201).send('User created successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Login
    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }

            // Check password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).send('Invalid email or password');
            }

            // Generate JWT Token 
            const token = jwt.sign({ _id: user._id }, process.env.tokenCode); 

            res.status (200).send({ message: 'Logged in successfully', user, token });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Change Verified Status
    async changeVerifiedStatus(req, res) {
        try {
            const userId = req.body.email; // Assuming the user's ID is passed as a URL parameter
            const newVerifiedStatus = req.body.verified; // Assuming the new status is passed in the request body

            // Find the user by ID and update the verified status
            const user = await User.findOneAndUpdate(userId, { verified: newVerifiedStatus }, { new: true });

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.send({ message: 'Verified status updated', user });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get all users
    async getAllUsers(req,res){
        try{
            const users = await User.find()
            res.status (200).send({  users });
        }catch{
            res.status(400).send ({message : "there is a problem"})
        }
    },
};

module.exports = userController;
