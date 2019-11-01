const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const authenticate = require('./middleware/authenticate');
const cors = require('cors');

admin.initializeApp();

const app = express();

app.use(cors({ origin: true })); // firebase cors
app.use(authenticate); // firebase authentication middleware


exports.addUser = functions.https.onRequest((req, res) => {
  return cors(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://us-central1-co-creator-144ca.cloudfunctions.net/addUser');
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH');
      res.set('Access-Control-Allow-Headers', 'Authorization');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
      res.send('Hello World!');
    }

    /*
    Trigger: whenever a new user signs up
    Goal: Add the new user to the Users collection, also maybe send them a Welcome email?
    */
    const db = admin.firestore();
    const {uid, email, username, photoURL, name} = req.body;
    console.log("Here is req.body: ", req.body)
    

    const data = {
      email: email,
      name: name,
      username: username,
      photo: photoURL,
      dateCreated: admin.firestore.Timestamp.now()
    }
    console.log("Here is the user data ", data);
    try {
      let setUser = await db.collection('users').doc(uid).set(data);
      console.log("Successfully created user!\n");
      console.log(setUser);
      console.log("User created at: ", setUser.writeTime);
      res.status(201).send("User added to database!")
    } catch (error) {
      console.log("Error Storing user in database \n");
      console.log(error);
      res.status(400).send('Bad Request');
    }
  });
})