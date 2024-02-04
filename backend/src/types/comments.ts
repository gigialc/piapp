import { ObjectId } from "mongodb";
import { UserData } from "./user";

export interface CommentType {
    _id: ObjectId,
    content: string,
    user: UserData,
    communityId: {
        _id: ObjectId,
    },
    post: {
        _id: ObjectId,
    },
}
