import { Router } from "express";

import platformAPIClient from "../services/platformAPIClient";
import { ObjectId } from "mongodb";

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

  // Get all the communitiesCreated the user has created or joined
  router.get('/me', async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json(currentUser);
      }
      console.log(currentUser);
      // Find all the communitiesCreated communities ids in the collection
      const communityUser = await Promise.all(currentUser.communitiesCreated.map(async (community: any) => {
        console.log(communityUser);
        const communityCollection = req.app.locals.communityCollection;
        // Find all community documents in the collection
        const communities = await communityCollection.find({ _id: new ObjectId(community) }).toArray();
        console.log(communities);
        return communities;
      }));
      const communityMap = communityUser.map((community: any) => {
        return {
          //_id: community._id,
          name: community[0].name,
         // description: community.description,
        // posts: community.posts,
         // users: community.users,
         // tags: community.tags,
         // createdAt: community.createdAt,
          //updatedAt: community.updatedAt,
        }
      }
      )
      console.log(communityMap);
      if (communityMap) {
        return res.status(200).json(communityMap);
      } else {
        return res.status(401).json({ error: "Users did not create any communities" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }); 

  //check if user is already in the community
  router.post('/addUser', async (req, res) => {
    const userCollection = req.app.locals.userCollection;
    const id = req.body.community_id;
    console.log(id);
    const user = req.body.user_id;
    console.log(user);

    // Check if the user is already part of the community
  const existingUser = await userCollection.findOne({
    uid: user,
    communitiesJoined: new ObjectId(id)
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already in community" });
  }

    const insertUser = await userCollection.updateOne({
      //add the community object id to the user's communitiesJoined array
      uid: user
    }, {
      $push: {
        communitiesJoined: new ObjectId(id)
      }
    });
    if (insertUser) {
      return res.status(200).json({ message: "User added to community" });
    }
    return res.status(400).json({ message: "User not added to community" });
  }
);
}
