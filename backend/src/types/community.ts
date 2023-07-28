// Define community types
// Creator: Gigi
import { ObjectId } from "mongodb";

export interface Community {
    _id: ObjectId,
    name: string,
    description: string,
    members: Array<string>,
    posts: Array<string>,
    admins: Array<string>,
    moderators: Array<string>,
    rules: Array<string>,
//    tags: Array<string>,
//    createdAt: Date,
//    updatedAt: Date
}
