// Date: 2021-08-31
// Description: This file contains the endpoints for the community collection.
// Creator: Gigi

// Community endpoints under /community
import { Router } from "express";
import { ObjectId } from "mongodb";

export default function mountCommunityEndpoints(router: Router) {
    router.get('/community', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const communities = await communityCollection.find().toArray();
        return res.status(200).json({ communities });
    }
);

    router.post('/community', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const community = req.body.community;
        const insertResult = await communityCollection.insertOne(community);
        const newCommunity = await communityCollection.findOne(insertResult.insertedId);
        return res.status(200).json({ newCommunity });
    }
);

    router.get('/community/:id', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ community });
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

    router.post('/community/:id/moderator', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (community.moderators.includes(user.uid)) {
            return res.status(200).json({ message: "User is already a moderator" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { moderators: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/unmoderator', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const user = req.body.user;
        const community = await communityCollection.findOne({ _id: new ObjectId(id) });
        if (!community.moderators.includes(user.uid)) {
            return res.status(200).json({ message: "User is not a moderator" });
        }
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $pull: { moderators: user.uid } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/rule', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const rule = req.body.rule;
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { rules: rule } });
        const updatedCommunity = await communityCollection.findOne({ _id: new ObjectId(id) });
        return res.status(200).json({ updatedCommunity });
    }
);

    router.post('/community/:id/tag', async (req, res) => {
        const communityCollection = req.app.locals.communityCollection;
        const id = req.params.id;
        const tag = req.body.tag;
        const updateResult = await communityCollection.updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });
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