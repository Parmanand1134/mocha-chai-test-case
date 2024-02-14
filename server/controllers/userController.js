const { User } = require('../models/user');
const _ = require('lodash');

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        // Create a new user instance
        const user = new User({
            email,
            password
        });

        // Save the user to the database
        await user.save();

        res.status(201).send({ message: "User create success", data: user });
    } catch (error) {
        res.status(400).send(error);
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by credentials
        const user = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        // Generate and save a new authentication token
        const token = await user.generateAuthToken();

        // Send user and token in the response header
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    loginUser,
    createUser
};


// Other functions for getting user details and logging out

module.exports = {
    createUser,
    loginUser,
    // Export other functions as needed
};
