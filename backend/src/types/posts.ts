// Define community types
// Creator: Gigi
import { ObjectId } from "mongodb";
import { UserData } from "./user";
import { CommentType } from "./comments";

export interface PostType {
    _id: ObjectId,
    title: string,
    content: string,
    user: UserData,
    communityId: {
        _id: ObjectId,
    },
    comments: CommentType[],
    likes: number,
    
}
