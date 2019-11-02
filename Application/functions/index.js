const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const authenticate = require('./middleware/authenticate');

admin.initializeApp();

const app = express();

app.use(authenticate); // firebase authentication middleware


exports.addUser = functions.https.onRequest(async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
  }

  /*
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
    res.status(204).send("User added to database!")
    res.status(201).send("User added to database!")
  } catch (error) {
    console.log("Error Storing user in database \n");
    console.log(error);
    res.status(400).send('Bad Request');
  }
})