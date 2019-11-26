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
    const { 
      uid, 
      email, 
      username, 
      photoURL, 
      name, 
      workBiography, 
      projectPositions,
      subjectExperience,
      subjectTags
    } = req.body;
    console.log("Here is req.body: ", req.body);

    const privateData = {
      name: name,
      username: username,
      photo: photoURL,
      email: email,
      dateCreated: admin.firestore.Timestamp.now()
    };
    
    const publicData = {
      name: name,
      username: username,
      photo: photoURL,
      workBiography: workBiography,
      projectPositions: projectPositions,
      subjectExperience: subjectExperience,
      subjectTags: subjectTags,
      dateCreated: admin.firestore.Timestamp.now()
    };
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

// Called when adding subjects a user needs experience in
exports.postSubjectExperience = functions.https.onRequest(async (req, res) => {
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
    // Starting addition of subject
    const db = admin.firestore();
    const { username, subjectExperience } = req.body;
    console.log("Here is req.body: ", req.body);

    const data = {
      subjectExperience: subjectExperience
    };
    console.log("Here is the subject the user needs experience in: ", data);
    try {
      let setPublicSubjectExperience = await db
        .collection("public_user_information")
        .doc(username)
        .update({
          subjectExperience: admin.firestore.FieldValue.arrayUnion(subjectExperience)
        });
      console.log("Successfully added subject!\n");
      console.log(setPublicSubjectExperience);
      console.log("Subject added at: ", setPublicSubjectExperience.writeTime);
      res.status(201).send(data);
    } catch (error) {
      console.log("Error adding subject \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});

// Called when adding a subject tag a user needs experience in
exports.postSubjectTags = functions.https.onRequest(async (req, res) => {
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
    // Starting addition of subject tag
    const db = admin.firestore();
    const { username, subjectTags } = req.body;
    console.log("Here is req.body: ", req.body);

    const data = {
      subjectTags: subjectTags
    };
    console.log("Here is the subject tag that the user needs experience in: ", data);
    try {
      let setPublicSubjectTags = await db
        .collection("public_user_information")
        .doc(username)
        .update({
          subjectTags: admin.firestore.FieldValue.arrayUnion(subjectTags)
        });
      console.log("Successfully added subject tag!\n");
      console.log(setPublicSubjectTags);
      console.log("Subject tag added at: ", setPublicSubjectTags.writeTime);
      res.status(201).send(data);
    } catch (error) {
      console.log("Error adding subject tag \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});

// Called when adding a project position a user needs experience in
exports.postProjectPositions = functions.https.onRequest(async (req, res) => {
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
    // Starting addition of project position
    const db = admin.firestore();
    const { username, projectPositions } = req.body;
    console.log("Here is req.body: ", req.body);

    const data = {
      projectPositions: projectPositions
    };
    console.log("Here is the project position that the user needs experience in: ", data);
    try {
      let setPublicProjectPositions = await db
        .collection("public_user_information")
        .doc(username)
        .update({
          projectPositions: admin.firestore.FieldValue.arrayUnion(projectPositions)
        });
      console.log("Successfully added project position!\n");
      console.log(setPublicProjectPositions);
      console.log("Project Position added at: ", setPublicProjectPositions.writeTime);
      res.status(201).send(data);
    } catch (error) {
      console.log("Error adding project position \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});

// Called when deleting a certain part of a user profile
exports.deleteUserContent = functions.https.onRequest(async (req, res) => {
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
    // Starting deletion of public user content data
    const db = admin.firestore();
    const { username, array } = req.body;
    console.log("Here is req.body: ", req.body);
    console.log(req);
    console.log(req.body);
    console.log(array)
    console.log(Object.keys(req.body)[1]);
    console.log(Object.values(req.body)[1]);
    console.log({[Object.keys(req.body)[1]]: Object.values(req.body)[1]})

    const data = {
      username: username,
      [Object.keys(req.body)[1]]: Object.values(req.body)[1]
    };
    console.log("Here is what user is deleting what: ", data);
    console.log(username);
    try {
      let setPublicProjectPositions = await db
        .collection("public_user_information")
        .doc(username)
        .update({[Object.keys(req.body)[1]]: Object.values(req.body)[1]});
      console.log("Successfully deleted content!\n");
      console.log(setPublicProjectPositions);
      console.log("Content deleted at: ", setPublicProjectPositions.writeTime);
      res.status(201).send(data);
    } catch (error) {
      console.log("Error deleting \n");
      console.log(error);
      res.status(400).send("Bad Request");
    }
  }
});
