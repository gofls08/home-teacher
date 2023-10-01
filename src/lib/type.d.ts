import type { ObjectId } from "mongodb";

export interface iPost {
    user: any | null;
    group: string | undefined;
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
        group:string | undefined;
    }
export interface iChat {
		// _id: string;
		user: any | null;
		chat: string;
		date: Date;
		group: string | undefined
	}

export interface iUser{
    user: string,
    uid:string,
    group:Array,
}

export interface iGroup{
    name: string,
    _id:ObjectId,
}