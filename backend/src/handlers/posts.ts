import { Router } from "express";
import { ObjectId } from "mongodb";
import { CommunityType } from "../types/community";
import { UserData } from "../types/user";
import "../types/session";
import platformAPIClient from "../services/platformAPIClient";

export default function mountPostEndpoints(router: Router) {

    router.post('/posted', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        try {
            const postCollection = req.app.locals.postCollection;
            const posts = req.body;
    
            // Assuming community_id is directly passed and needs to be stored as ObjectId
            const communityId = new ObjectId(posts.community_id); // Convert to ObjectId if it's passed as a string
    
            const postsData = {
                _id: new ObjectId(),
                title: posts.title,
                description: posts.description,
                user: req.session.currentUser,
                community_id: communityId, // Store the community ID directly
                comments: [],
            }
    
            const insertResult = await postCollection.insertOne(postsData);
            // Other operations like updating user's communitiesCreated...
            return res.status(200).json({ newPost: insertResult.ops[0], message: "Post created successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error creating post", error });
        }
    });
    
    // Get all the posts from the specific community by checking the community id of all posts
    router.get('/posts1', async (req, res) => {
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
