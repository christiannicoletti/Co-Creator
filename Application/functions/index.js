const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const authenticate = require('./middleware/authenticate');

admin.initializeApp();

const app = express();

app.use(authenticate); // firebase authentication middleware


exports.addUser = functions.auth.user().onCreate(async(user) => {
  /*
  Trigger: whenever a new user signs up
  Goal: Add the new user to the Users collection, also maybe send them a Welcome email?
  */
  const db = admin.firestore();
  const {uid, email, displayName, photoURL} = user;

  const data = {
    email: email,
    name: displayName,
    photo: photoURL,
    dateCreated: admin.firestore.Timestamp.now()
  }
  console.log("Here is the user data", user);

  try {
    let setUser = await db.collection('users').doc(uid).set(data);
    console.log("Successfully created user!\n");
    console.log(setUser);
    console.log("User created at: ", setUser.writeTime);
    return;
  } catch (error) {
    console.log("Error Storing user in database \n");
    console.log(error);
    return;
  }
})