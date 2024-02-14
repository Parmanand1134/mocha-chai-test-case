const express = require('express');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');
const cusotmerController = require('../controllers/customerController');
const postController = require('../controllers/postController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

// Todo routes
// router.post('/todos', authenticate, todoController.createTodo);
// router.get('/todos', authenticate, todoController.getTodos);
// // Other todo routes

// // User routes
router.post('/users', userController.createUser);
router.post('/signup', userController.createUser);
router.post('/customer/signup', cusotmerController.createCustomer);
router.post('/customer/login', cusotmerController.login);
// Other user routes

router.post('/post/create', postController.createPost);

router.get('/', (req, res) => {
    res.send('success');
})


module.exports = router;
