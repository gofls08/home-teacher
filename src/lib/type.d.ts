import type { ObjectId } from "mongodb";

export interface iPost {
    user: any | null;
    group: string;
    date: Date;
    title: string;
    body: string;
    img?: string;
    _id?:string|ObjectId;
}
 export interface Reply {
        postId: string;
        user: any | null;
        date: Date;
        content: string;
    }
export interface iChat {
		// _id: string;
		user: any | null;
		chat: string;
		date: Date;
		group: string;
	}