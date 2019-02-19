// Node modules
const express = require('express');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


// Variables
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/';

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/todos', function(req, res) {
	res.send(
		// Connect to mongo database
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			var dbo = db.db('office');
			// Return array of all documents in collection 'todos'
			dbo.collection('todos').find({}).toArray(function(err, result){
				if (err) throw err;
				console.log(result);
				return result;
				db.close();
			});
		})
	);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
