const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Customer } = require('../models/customer');


const createCustomer = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if email format is valid
        if (!validateEmail(email)) {
            throw new Error('Invalid email format');
        }

        // Check if password meets minimum length requirement
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Check if the email already exists
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user instance with the hashed password
        const user = new Customer({
            email,
            password: hashedPassword,
            name
        });

        // Save the user to the database
        await user.save();

        res.status(201).send({ status: true, message: "Customer created successfully", data: user });
    } catch (error) {
        res.status(400).send({ status: false, error: error.message });
    }
};

// Function to validate email format
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Customer.findOne({ email });

        if (!user) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send({ error: 'Password not match' });
        }

        // If passwords match, generate and save a new authentication token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key

        // Send user and token in the response header
        res.send({ message: 'User login success', data: user, token: token });
    } catch (error) {
        res.status(400).send({ error: 'Login failed' });
    }
};

module.exports = {
    login,
    createCustomer
};


