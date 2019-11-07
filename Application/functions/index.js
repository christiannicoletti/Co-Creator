const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const authenticate = require("./middleware/authenticate");

admin.initializeApp();

const app = express();

app.use(authenticate); // firebase authentication middleware

// Called when signing up
exports.addPrivateandPublicUser = functions.https.onRequest(async (req, res) => {
  console.log("Setting CORS header");
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    console.log("Setting CORS preflight options");
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    res.status(201).send("CORS preflight options set!");
  } else {
    // Starting storage of userData
    const db = admin.firestore();
    const { uid, email, username, photoURL, name, workBiography } = req.body;
    console.log("Here is req.body: ", req.body);

    const privateData = {
      email: email,
      dateCreated: admin.firestore.Timestamp.now()
    };
    
    const publicData = {
      name: name,
      username: username,
      photo: photoURL,
      workBiography: workBiography,
      dateCreated: admin.firestore.Timestamp.now()
    };
    console.log("Here is userData: ", data);
    try {
      let setPrivateUser = await db
        .collection("private_user_information")
        .doc(uid)
        .set(privateData);
      console.log("Successfully created user!\n");
      console.log(setPrivateUser);
      console.log("User created at: ", setPrivateUser.writeTime);
      let setPublicUser = await db
        .collection("public_user_information")
        .doc(username)
        .set(publicData);
      console.log("Successfully created user!\n");
      console.log(setPublicUser);
      console.log("User created at: ", setPublicUser.writeTime);
      res.status(201).send("User added to database!");
    } catch (error) {
      console.log("Error storing user in database \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});

// Called when logging in (private user information such as tokens and UID)
exports.getPrivateUser = functions.https.onRequest(async (req, res) => {
  console.log("Setting CORS header");
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    console.log("Setting CORS preflight options");
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    res.status(201).send("CORS preflight options set!");
  } else {
    const db = admin.firestore();
    const { uid } = req.body;
    console.log("Here is req.body: ", req.body);

    let docRef = db.collection("private_user_information").doc(uid);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          res.status(201).send(doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          res.status(400).send("Bad Request");
          return console.log("No such user!");
        }
      })
      .catch(function(error) {
        res.status(400).send("Bad Request");
        return console.log("Error getting user:", error);
      });
  }
});

// Called when accessing a user profile page
exports.getPublicUser = functions.https.onRequest(async (req, res) => {
  console.log("Setting CORS header");
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    console.log("Setting CORS preflight options");
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    res.status(201).send("CORS preflight options set!");
  } else {
    const db = admin.firestore();
    const { username } = req.body;
    console.log("Here is req.body: ", req.body);

    let docRef = db.collection("public_user_information").doc(username);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          res.status(201).send(doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          res.status(400).send("Bad Request");
          return console.log("No such user!");
        }
      })
      .catch(function(error) {
        res.status(400).send("Bad Request");
        return console.log("Error getting user:", error);
      });
  }
});

// Called when adding a user biography
exports.postBiography = functions.https.onRequest(async (req, res) => {
  console.log("Setting CORS header");
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    console.log("Setting CORS preflight options");
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    res.status(201).send("CORS preflight options set!");
  } else {
    // Starting storage of user biography
    const db = admin.firestore();
    const { username, workBiography } = req.body;
    console.log("Here is req.body: ", req.body);

    const data = {
      workBiography: workBiography
    };
    console.log("Here is the user's biography: ", data);
    try {
      let setPublicWorkBiography = await db
        .collection("public_user_information")
        .doc(username)
        .update(data);
      console.log("Successfully created user biography!\n");
      console.log(setPublicWorkBiography);
      console.log("User biography created at: ", setPublicWorkBiography.writeTime);
      res.status(201).send(data);
    } catch (error) {
      console.log("Error storing user biography \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});
