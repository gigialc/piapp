import { Router } from "express";
import { ObjectId } from "mongodb";
import { CommunityType } from "../types/community";
import { UserData } from "../types/user";
import "../types/session";
import platformAPIClient from "../services/platformAPIClient";

export default function mountPostEndpoints(router: Router) {

    router.post('/posts', async (req, res) => {
        try {
            const postCollection = req.app.locals.postCollection;
            const creatorId = req.session.currentUser?.uid;// Add a check for null or undefined
            const posts = req.body;
            console.log(posts);
            if (!req.session.currentUser) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
              }
              const app = req.app;
            const postsData = {
                _id: new ObjectId(),
                title: posts.title,
                description: posts.description,
                user: req.session.currentUser,
                //community id
                community: {
                    _id: new ObjectId(),
                },
                comments: [],

            }
            const insertResult = await postCollection.insertOne(postsData);
            const newPosts = await postCollection.findOne(insertResult.insertedId);
            const userData = app.locals.userCollection;
            const creator = await userData.findOne({ uid: creatorId });
            if (!creator) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
              }
              const updateResult = await userData.updateOne({ _id: creator._id }, { $push: { communitiesCreated: newPosts._id } });
                const updatedUser = await userData.findOne({ _id: creator._id });
                req.session.currentUser = updatedUser;
            return res.status(200).json({ newPosts, message: "Post created successfully"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error creating community", error });
        }
    }

);
    router.get('/hi', async (req, res) => {
        try {
            if (!req.session.currentUser) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const postCollection = req.app.locals.postCollection;
            const creatorId = req.session.currentUser?.uid;
            // Find all community documents in the collection
            const posts = await postCollection.find({}).toArray();
            return res.status(200).json({ posts });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error fetching communities", error });
        }
    });


}
