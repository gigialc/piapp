// Date: 2021-08-31
// Description: This file contains the endpoints for the community collection.
// Creator: Gigi

// Community endpoints under /community
import { Router } from "express";
import { ObjectId } from "mongodb";
import { CommunityType } from "../types/community";
import { UserData } from "../types/user";
import "../types/session";
import platformAPIClient from "../services/platformAPIClient";

export default function mountCommunityEndpoints(router: Router) {
    router.get('/create', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const communities = await communityCollection.find().toArray();//include only info you need, you don't need to see the community id
        return res.status(200).json({ communities });
    }
);

    router.post('/create', async (req, res) => {
        try {
            const communityCollection = req.app.locals.communityCollection;
            const creatorId = req.session.currentUser?.uid;// Add a check for null or undefined
            const community = req.body;
            console.log(community);
            if (!req.session.currentUser) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
              }
              const app = req.app;
            const communityData = {
                _id: new ObjectId(),
                name: community.title,
                description: community.description,
                user: req.session.currentUser.uid,
                price: community.price,
                moderators: community.moderators,
                members: community.members,
                invited: community.invited,
                posts: community.posts,
                rules: community.rules,
                tags: community.tags,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const insertResult = await communityCollection.insertOne(communityData);
            const newCommunity = await communityCollection.findOne(insertResult.insertedId);
            const userData = app.locals.userCollection;
            const creator = await userData.findOne({ uid: creatorId });
            if (!creator) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
              }
              const updateResult = await userData.updateOne({ _id: creator._id }, { $push: { communitiesCreated: newCommunity._id } });
                const updatedUser = await userData.findOne({ _id: creator._id });
                req.session.currentUser = updatedUser;
            return res.status(200).json({ newCommunity });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error creating community", error });
        }
    }

);

//adding an array of posts to a community
router.post('/posts', async (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
    }
    // Assuming req.body is structured correctly with a community_id and the post data
    const communityCollection = req.app.locals.communityCollection;
    const communityId = req.body.community_id; // The ID of the community
    const post = req.body.post; // The post data

    if (!communityId || !post) {
        // If there's no community ID or post data, return a bad request response
        return res.status(400).json({ error: 'bad request', message: "Missing community ID or post data" });
    }

    try {
        // Update the community document by adding the new post to the 'posts' array
        const updateResult = await communityCollection.updateOne(
            { _id: new ObjectId(communityId) },
            { $push: { posts: post } }
        );

        if (updateResult.matchedCount === 0) {
            // If no community matches the given ID, return a not found response
            return res.status(404).json({ error: 'not found', message: "Community not found" });
        }

        // Retrieve the updated community document
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(communityId) });

        // Return the updated community
        return res.status(200).json({ updatedCommunity });
    } catch (error) {
        // If an error occurs, return an error response
        console.error(error);
        return res.status(500).json({ error: 'internal server error', message: "An error occurred while updating the community" });
    }
});


//get the array of posts from a community
router.get('/posts', async (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
    }
    // Assuming req.query is structured correctly with a community_id
    const communityCollection = req.app.locals.communityCollection;
    const communityId = req.query.community_id; // The ID of the community

    if (!communityId) {
        // If there's no community ID, return a bad request response
        return res.status(400).json({ error: 'bad request', message: "Missing community ID" });
    }

    try {
        // Retrieve the community document
        const community = await communityCollection.findOne({ _id: new String(communityId) });

        if (!community) {
            // If no community matches the given ID, return a not found response
            return res.status(404).json({ error: 'not found', message: "Community not found" });
        }

        // Return the community's posts
        return res.status(200).json({ posts: community.posts });
    } catch (error) {
        // If an error occurs, return an error response
        console.error(error);
        return res.status(500).json({ error: 'internal server error', message: "An error occurred while retrieving the community's posts" });
    }
});


router.get('/hi', async (req, res) => {
    try {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const communityCollection = req.app.locals.communityCollection;
        const creatorId = req.session.currentUser?.uid;
        // Find all community documents in the collection
        const communities = await communityCollection.find({}).toArray();
        // if a community has the same id as the user id, then do not return the community
        const filteredCommunities = communities.filter((community: any) => {
            return community.user !== creatorId;
        });
       // Send the array of filtered communities back to the client
       return res.status(200).json(filteredCommunities);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching communities", error });
    }
});

    router.get('/community/:id', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
      console.log(id);
        const community = await communityCollection.findOne({ _id: id });
        console.log(community);
        return res.status(200).json({ name: community.name });
    }
);

    router.put('/community/:id', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const community = req.body.community;
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $set: community });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.delete('/community/:id', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const deleteResult = await communityCollection.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ deleteResult });
    }
);

    //adding user to a community

    router.post('/community/:id/addUser', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.body.community_id;
        const user = req.body.user_id;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (community.members.includes(user)) {
            return res.status(200).json({ message: "User is already a member" });
        }
  
    }
);

    router.post('/community/:id/leave', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (!community.members.includes(user.uid)) {
            return res.status(200).json({ message: "User is not a member" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { members: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);
    
    router.post('/community/:id/post', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const post = req.body.post;
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { posts: post } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/admin', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (community.admins.includes(user.uid)) {
            return res.status(200).json({ message: "User is already an admin" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { admins: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/unadmin', async (req, res) => {

        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (!community.admins.includes(user.uid)) {
            return res.status(200).json({ message: "User is not an admin" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { admins: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/invite', async (req, res) => {

        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (community.invited.includes(user.uid)) {
            return res.status(200).json({ message: "User is already invited" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { invited: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });

    }
);

    router.post('/community/:id/uninvite', async (req, res) => {
            
            const communityCollection = req.app.locals.communityCollection;
            const id = req.params.id;
            const user = req.body.user;
            const community = await communityCollection.findOne({ _id: new ObjectId(id) });
            if (!community.invited.includes(user.uid)) {
                return res.status(200).json({ message: "User is not invited" });
            }
            const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { invited: user.uid } });
            const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
            return res.status(200).json({ updatedCommunity });
    
        }
    );

    router.post('/community/:id/accept', async (req, res) => {

        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (!community.invited.includes(user.uid)) {
            return res.status(200).json({ message: "User is not invited" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { invited: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });

    }
    );

    router.post('/community/:id/decline', async (req, res) => {
            
            const communityCollection = req.app.locals.communityCollection;
            const id = req.params.id;
            const user = req.body.user;
            const community = await communityCollection.findOne({ _id: new ObjectId(id) });
            if (!community.invited.includes(user.uid)) {
                return res.status(200).json({ message: "User is not invited" });
            }
            const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { invited: user.uid } });
            const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
            return res.status(200).json({ updatedCommunity });
        }
        );


//onclick 
//onchange
//onchan    
//onsubmit

}

function userInfo() {
    throw new Error("Function not implemented.");
}
