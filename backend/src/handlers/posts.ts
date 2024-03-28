import { Router } from "express";
import { ObjectId } from "mongodb";
import { CommunityType } from "../types/community";
import { UserData } from "../types/user";
import "../types/session";
import platformAPIClient from "../services/platformAPIClient";

export default function mountPostEndpoints(router: Router) {

    router.post('/posted', async (req, res) => {
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
            
            // Fetch the newly created post using the insertedId
            const newPost = await postCollection.findOne({ _id: insertResult.insertedId });
    
            // Other operations like updating user's communitiesCreated...
            return res.status(200).json({ newPost: newPost, message: "Post created successfully" });
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

    router.post('/comments', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        try {
            const postCollection = req.app.locals.postCollection;
            const postId = req.body.post_id;
            const content = req.body.content;
    
            // Create a new ObjectId for the comment (if you're using MongoDB's built-in _id)
            const commentId = new ObjectId();
    
            const commentData = {
                _id: commentId,
                content: content,
                user: req.session.currentUser,
                createdAt: new Date(), // Adding a timestamp for when the comment is created
            };
    
            // Update the post to include the new comment
            const updateResult = await postCollection.updateOne(
                { _id: new ObjectId(postId) }, // Ensure to convert postId to ObjectId
                { $push: { comments: commentData } }
            );
    
            if (updateResult.matchedCount === 0) {
                return res.status(404).json({ message: "Post not found" });
            }
    
            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ message: "Failed to add comment" });
            }
    
            return res.status(200).json({ newComment: commentData, message: "Comment added successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error adding comment", error });
        }
    });

    router.get('/post/:id', async (req, res) => {
        const postCollection = req.app.locals.postCollection;
        const id = req.params.id; // Make sure to require ObjectId from mongodb
        try {
          const post = await postCollection.findOne({ _id: new ObjectId(id) });
          if (!post) {
            return res.status(404).json({ error: 'Post not found' });
          }
          console.log(post);
          return res.status(200).json({ title: post.title, description: post.description });

        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error fetching post", error });
        }
    });

    //update likes on a post 
    router.post('/like/:id', async (req, res) => {
        const postCollection = req.app.locals.postCollection;
        const id = req.params.id;
        try {
            const updateResult = await postCollection.updateOne(
                { _id: new ObjectId(id) },
                { $inc: { likes: 1 } }
            );
            if (updateResult.matchedCount === 0) {
                return res.status(404).json({ message: "Post not found" });
            }
            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ message: "Failed to like post" });
            }
            return res.status(200).json({ message: "Post liked successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error liking post", error });
        }
    });
    
}
