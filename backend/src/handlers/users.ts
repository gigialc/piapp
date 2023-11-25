import { Router } from "express";

import platformAPIClient from "../services/platformAPIClient";

export default function mountUserEndpoints(router: Router) {
  // handle the user auth accordingly
  router.post('/signin', async (req, res) => {
    const auth = req.body.authResult;
    const userCollection = req.app.locals.userCollection;
    console.log(auth);
    try {
      // Verify the user's access token with the /me endpoint:
      const me = await platformAPIClient.get(`/v2/me`, { headers: { 'Authorization': `Bearer ${auth.accessToken}` } });
      console.log(me);
    } catch (err) {
      console.log(err);
      return res.status(401).json({error: "Invalid access token"}) 
    }

    let currentUser = await userCollection.findOne({ uid: auth.user.uid });
    console.log(currentUser);
    if (currentUser) {
      await userCollection.updateOne({
        _id: currentUser._id
      }, {
        $set: {
          accessToken: auth.accessToken,
        }
      });
    } else {
      const insertResult = await userCollection.insertOne({
        username: auth.user.username,
        uid: auth.user.uid,
        roles: auth.user.roles,
        accessToken: auth.accessToken,
        communities: []
      });
      
      currentUser = await userCollection.findOne(insertResult.insertedId);
    }

    req.session.currentUser = currentUser;

    return res.status(200).json({ message: "User signed in" });
  });
  console.log("hi6")

  // handle the user auth accordingly
  router.get('/signout', async (req, res) => {
    req.session.currentUser = null;
    return res.status(200).json({ message: "User signed out" });
  });

  // get the current user
  router.get('/me', async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      console.log(currentUser);
      if (currentUser) {
        return res.status(200).json(currentUser);
      } else {
        return res.status(401).json({error: "User not signed in"}) 
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error"})
    }
  }
  );

}
