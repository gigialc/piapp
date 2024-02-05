import { Router } from "express";
import { ObjectId } from "mongodb";
import { CommunityType } from "../types/community";
import { UserData } from "../types/user";
import "../types/session";
import platformAPIClient from "../services/platformAPIClient";

export default function mountCommentEndpoints(router: Router) {

   //check if user is already in the community
   router.post('/comments', async (req, res) => {
    const postCollection = req.app.locals.postCollection;
    const id = req.body.post_id;
    console.log(id);
    const user = req.body.user_id;
    console.log(user);
// insert a comment into the specific post by checking the post id
    const comment = {
        _id: new ObjectId(),
        description: req.body.description,
        user: user,
        postId: id,
    }
    console.log(comment);
    const insertResult = await postCollection.updateOne(
        { _id: id },
        { $push: { comments: comment } }
    );
    return res.status(200).json({ message: "Comment added successfully" });
}
);

    
    // Get all the posts from the specific community by checking the community id of all posts
    router.get('/comments1', async (req, res) => {
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
}
