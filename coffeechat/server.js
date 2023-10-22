console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// Replace the URL below with the URL for your database
const url =  'mongodb://mongodb:27017?directConnection=true';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  //db = database;
  db = database.db("coffeechat");
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', (req, res) => {
  res.sendFile(__dirname + '/client.js');
});


// not used now
app.post('/notused', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);

  db.collection('clicks').insertOne(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.sendStatus(201);
  });
});

// get count of saved messages from the database
app.get('/getCount', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err);
    console.log('result ' + result.length)
    res.send({result: result.length});
  });
});


//consume 
// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["kafka:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"
const kafka = new Kafka({ clientId, brokers })


const consumer = kafka.consumer({ groupId: clientId })

const produce = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
			db.collection('users').insertOne(message, (err, result) => {
                        if (err) {
                           return console.log(err);
                        }
                        console.log('message saved to  db');
                        });
		},
	})
}
produce()
