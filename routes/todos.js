const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-schema');

/* GET todos listing. */
router.get('/', function (req, res, next) {
	Todo.find()
		.then(todos => {
			if (todos) {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json({ todos });
			}
		})
		.catch(err => {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 500;
			res.json({ error: err });
		});
});

module.exports = router;
