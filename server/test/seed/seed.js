const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { Customer } = require('./../../models/customer');
const { User } = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: "person1@gmail.com",
  password: "person1PASSWORD",
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneID, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoID,
  email: "person2@gmail.com",
  password: "person2PASSWORD",
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoID, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}]

const dummyCustomer = {
  "email": "shree@mailinator.com",
  "password": "passwordd",
  "name": "param"
}

const todos = [{
  _id: new ObjectID(),
  text: "First test todo",
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: "Second test todo",
  _creator: userTwoID
}];

const posts = [{
  _id: new ObjectID(),
  title: "First test Post",
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: "Second second post",
  _creator: userTwoID
}];

var addDummyTodoItems = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};



var addDummyUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};
var addDummyCustomer = (done) => {
  Customer.deleteMany({}).then(() => {
    var userOne = new Customer(dummyCustomer).save();

    return Promise.all([userOne])
  }).then(() => done());
};

module.exports = {
  todos,
  addDummyTodoItems,
  users,
  addDummyUsers,
  posts,
  dummyCustomer,
  addDummyCustomer
}
