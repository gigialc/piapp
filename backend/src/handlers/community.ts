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
            const communityCollection = req.app.locals.communityCollection;// Add a check for null or undefined
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
            return res.status(200).json({ newCommunity });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error creating community", error });
        }
    }

);

router.get('/hi', async (req, res) => {
    try {
        const communityCollection = req.app.locals.communityCollection;

        // Find all community documents in the collection
        const communities = await communityCollection.find({}).toArray();
        console.log(communities);
        // Send the array of communities back to the client
        return res.status(200).json(communities);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching communities", error });
    }
});

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

    router.post('/community/:id/join', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (community.members.includes(user.uid)) {
            return res.status(200).json({ message: "User is already a member" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { members: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
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
