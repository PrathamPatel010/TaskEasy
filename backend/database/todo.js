const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    description: { type: String, unique: true, required: true },
    done: { type: Boolean },
    user: { type: mongoose.SchemaTypes.ObjectId },
}));

module.exports = { Todo };