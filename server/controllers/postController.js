const { Post } = require('../models/post');

const createPost = async (req, res) => {
    try {
        const { name, userId } = req.body;

        // Create a new post instance
        const post = new Post({
            name: name,
            _creator: userId // Assuming you have user information available in req.user
        });

        // Save the post to the database
        const savedPost = await post.save();

        res.status(201).send({ message: "post create success", data: savedPost });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createPost
};
