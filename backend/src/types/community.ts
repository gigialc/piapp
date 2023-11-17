// Define community types
// Creator: Gigi
import { ObjectId } from "mongodb";

export interface CommunityType {
    _id: ObjectId,
    name: string,
    description: string,
   price: number,
//    tags: Array<string>,
//    createdAt: Date,
//    updatedAt: Date
}
