const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
module.exports = api;

const db = require('./db-datastore');

//Get a list of all names stored
api.get('/', async (req, res) => {
	  try {
		      res.json(await db.list());
		    } catch (e) {
			        console.error(e);
			        res.sendStatus(500);
			      }
});

//Get a name and its  number
api.get('/:id(\\w+)', async (req, res) => {
	  try {
		      res.send(await db.get(req.params.id));
		    } catch (e) {
			        console.error(e);
			        res.sendStatus(500);
			      }
});

//Sets a names value to number inputed
api.put('/:id(\\w+)', bodyParser.text(),, async (req, res) => {
          try {
                      res.send(await db.put(req.params.id, req.body));
                    } catch (e) {
                                console.error(e);
                                res.sendStatus(500);
                              }
});

// Add a new name or update an existing name
api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
	  try {
		      res.send(await db.post(req.params.id, req.body));
		      
		    } catch (e) {
			        console.error(e);
			        res.sendStatus(500);
			      }
});

//Remove a name
api.delete('/:id(\\w+)', async (req, res) => {
          try {
                      await db.delete(req.params.id);
                      res.sendStatus(204);
                    } catch (e) {
                                console.error(e);
                                res.sendStatus(500);
                              }
});
