import { Router } from "express";

import platformAPIClient from "../services/platformAPIClient";
import { ObjectId } from "mongodb";
import { UserData } from "../types/user";

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


  router.get('/me', async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json(currentUser);
      }
      console.log(currentUser);
      const communityUser = await Promise.all(currentUser.communities.map(async (community: any) => {
        const communityCollection = req.app.locals.communityCollection;
        // Find all community documents in the collection
        const communities = await communityCollection.find({ _id: new ObjectId(community) }).toArray();
        console.log(communities);
        return communities;
      }));

      const mockUserData: UserData = {
        _id: new ObjectId(), // Automatically generates a new ObjectId
        username: 'mockUser',
        uid: 'mockUserId',
        roles: ['user'],
        accessToken: 'mockAccessToken',
        communities: [new ObjectId(), new ObjectId()],
        // communitiesJoined: [new ObjectId()] // Uncomment if needed
      };

      const communityMap = communityUser.map((community: any) => {
        return {
          //_id: community._id,
          name: community[0].name,
          members: [mockUserData],
          owner: community[0].owner         
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
  

}
