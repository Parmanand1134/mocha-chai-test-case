const { Todo } = require('../models/todo');
const { ObjectID } = require('mongodb');

const createTodo = async (req, res) => {
    try {
        const { text } = req.body;

        // Create a new todo instance
        const todo = new Todo({
            text,
            _creator: req.user._id // Assuming you have user information available in req.user
        });

        // Save the todo to the database
        const savedTodo = await todo.save();

        res.status(201).send(savedTodo);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getTodos = async (req, res) => {
    try {
        // Find all todos for the current user
        const todos = await Todo.find({ _creator: req.user._id });

        res.send({ todos });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createTodo,
    getTodos
};
