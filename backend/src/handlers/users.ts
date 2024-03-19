import { Router } from "express";

import platformAPIClient from "../services/platformAPIClient";
import { ObjectId } from "mongodb";
import { assert } from "console";

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
        communitiesCreated: [],
        communitiesJoined: []
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

  //Get info about user 
  router.get('/userInfo', async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.status(401).json({ error: "No current user found" });
    }
    return res.status(200).json(currentUser);
  });

  //Update user info
  router.post('/update', async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.status(401).json({ error: "No current user found" });
    }
    const userCollection = req.app.locals.userCollection;
    const { username, bio, occupation, coinbalance } = req.body;
    const updatedUser = await userCollection.findOneAndUpdate(
      { uid: currentUser.uid },
      { $set: { username: username, bio: bio, occupation: occupation, coinBalance: coinbalance } },
      { new: true, returnDocument: 'after' }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  });

  // Get all the communitiesCreated the user has created
  router.get('/me', async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json({ error: "No current user found" });
      }
  
      const communityCollection = req.app.locals.communityCollection;
      // Fetch communities in parallel
      const communities = await Promise.all(
        currentUser.communitiesCreated.map(async (communityId) => {
          // Directly find a single community by _id
          const community = await communityCollection.findOne({ _id: new ObjectId(communityId) });
          return community; // May return null if not found
        })
      );
  
      // Filter out nulls and map to desired structure
      const communityMap = communities.filter(c => c).map((community) => ({
        _id: community._id.toString(), // Convert ObjectId to string
        name: community.name,
        description: community.description,
        posts: community.posts,
        // Add other fields as needed
      }));
  
      if (communityMap.length > 0) {
        return res.status(200).json(communityMap);
      } else {
        return res.status(404).json({ error: "User did not create any communities" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

  // Get all the communitiesJoined the user has joined
  router.get('/joined', async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json({ error: "No current user found" });
      }
  
      const communityCollection = req.app.locals.communityCollection;
      const communities = await Promise.all(
        currentUser.communitiesJoined.map(async (communityId) => {
          const community = await communityCollection.findOne({ _id: new ObjectId(communityId) });
          return community; // May return null if not found
        })
      );
  
      const communityMap = communities.filter(c => c).map((community) => ({
        _id: community._id.toString(), // Convert ObjectId to string
        name: community.name,
        description: community.description,
        posts: community.posts,
        // Add other fields as needed
      }));
  
      if (communityMap.length > 0) {
        return res.status(200).json(communityMap);
      } else {
        return res.status(404).json({ error: "User has not joined any communities" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

  // Update the user collection by adding a community object to the joined communities
  router.post('/addUser', async (req, res) => {
    try {
      const { userId, communityId } = req.body;
      const userCollection = req.app.locals.userCollection;

      const updatedUser = await userCollection.findOneAndUpdate(
        { uid: userId },
        { $addToSet: { communitiesJoined: communityId } }, // Use communityId directly if it's stored as a string
        { new: true, returnDocument: 'after' }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "Community added to joined communities successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
});
  
  //get username for the user id from community
  router.get('/username', async (req, res) => {
    const userCollection = req.app.locals.userCollection;
    const user = req.query.user_id;
    console.log(user);
    const userObject = await userCollection.findOne({ uid: user });
    console.log(userObject);
    return res.status(200).json({ username: userObject.username });
  });
}

