import { ObjectId } from "mongodb";
import { UserData } from "./user";

export interface CommentType {
    _id: {
        $oid: string;
    };
    content: string;
    user: UserData;
    postId: {
        _id: {
            $oid: string;
        };
    };
    likes: number;
}
