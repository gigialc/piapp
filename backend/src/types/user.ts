import { ObjectId } from "mongodb";
import { CommunityType } from "./community";

export interface UserData {
  _id: ObjectId,
  username: string,
  uid: string,
  roles: Array<string>,
  accessToken: string,
  communitiesCreated: Array<ObjectId>,
  communitiesJoined: Array<ObjectId>
  
}
