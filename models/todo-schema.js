const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
	title: String,
	completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);