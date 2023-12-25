// Define community types
// Creator: Gigi
import { ObjectId } from "mongodb";
import { UserData } from "./user";

export interface CommunityType {
    _id: ObjectId,
    name: string,
    description: string,
    price: number,
    uid: string,
    owner : string,
    members: Array<ObjectId>,
//    tags: Array<string>,
    createdAt: Date,
    updatedAt: Date
}
