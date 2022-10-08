const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-schema');

/* Route for todos/ */
router.route('/')
	// GET
	.get(function (req, res, next) {
		Todo.find()
			.then(todos => {
				if (todos) {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 200;
					res.json(todos);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 500;
					res.json({ error: 'Unknown error fetching todos... try again.' });
				}
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
				if (todo) {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 200;
					res.json(todo);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 500;
					res.json({ error: 'Unknown error creating todo... try again.' });
				}
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
				if (todo) {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 200;
					res.json(todo);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 500;
					res.json({ error: 'Unknown error fetching todo... try again.' });
				}
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	})
	.put(function (req, res, next) {
		Todo.findByIdAndUpdate(req.params.id, req.body)
			.then(todo => {
				if (todo) {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 200;
					res.json(todo);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 500;
					res.json({ error: 'Unknown error updating todo... try again.' });
				}
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	})
	.delete(function (req, res, next) {
		Todo.findByIdAndRemove(req.params.id)
			.then(() => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 200;
				res.json({ success: true });
			})
			.catch(err => {
				res.setHeader('Content-Type', 'application/json');
				res.statusCode = 500;
				res.json({ error: err });
			});
	});

module.exports = router;
