// Define community types
// Creator: Gigi
import { ObjectId } from "mongodb";
import { UserData } from "./user";

export interface PostType {
    _id: ObjectId,
    title: string,
    content: string,
    user: UserData,
    communityId: {
        _id: ObjectId,
    },
    comments: Array<ObjectId>,
}
