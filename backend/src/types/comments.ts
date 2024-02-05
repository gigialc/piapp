import { ObjectId } from "mongodb";
import { UserData } from "./user";

export interface CommentType {
    //it is an array of comments
    _id: ObjectId,
    description: string,
    user: UserData,
    postId: {
        _id: ObjectId,
    },
}
