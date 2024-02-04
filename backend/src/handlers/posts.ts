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
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
    
        try {
            const postCollection = req.app.locals.postCollection;
            const communityId = new ObjectId(req.query.community_id as string); // Cast and convert to ObjectId
    
            // Directly find posts with the matching community_id
            const posts = await postCollection.find({ community_id: communityId }).toArray();
    
            return res.status(200).json({ posts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching posts", error });
        }
    });

    //posting comments inside a specific post id
    router.post('/comments', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        try {
            const postCollection = req.app.locals.postCollection;
            const postId = new ObjectId(req.body.post_id);
            const comment = req.body.comment;
    
            const updateResult = await postCollection.updateOne(
                { _id: postId },
                { $push: { comments: comment } }
            );
    
            if (updateResult.matchedCount === 0) {
                return res.status(404).json({ message: "Post not found" });
            }
    
            return res.status(200).json({ message: "Comment added successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error adding comment", error });
        }
    });
    
}
