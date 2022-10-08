const express = require('express');
const { response } = require('../app');
const router = express.Router();
const Todo = require('../models/todo-schema');

/* Route for todos/ */
router.route('/')
	// GET
	.get(function (req, res, next) {
		Todo.find()
			.then(todos => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json(todos);
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	})
	// POST
	.post(function (req, res, next) {
		Todo.create(req.body)
			.then(todo => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json(todo);
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	});

router.route('/:id')
	.get(function (req, res, next) {
		Todo.findById(req.params.id)
			.then(todo => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json(todo);
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	})
	.put(function (req, res, next) {
		Todo.findByIdAndUpdate(req.params.id, {
			$set: req.body
		}, { new: true })
			.then(todo => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json(todo);
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	})
	.delete(function (req, res, next) {
		Todo.findByIdAndDelete(req.params.id)
			.then(response => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json(response);
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	});

module.exports = router;
