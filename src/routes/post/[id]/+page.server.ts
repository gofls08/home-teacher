import type { PageServerLoad } from "./$types";
import db from "$lib/db"
import { ObjectId } from "mongodb";
import type { iPost } from "$lib/type";
export const load:PageServerLoad = async ({params}) => {
    const collection = db.collection<iPost>("Post");
    const result = await collection.findOne({_id:new ObjectId(params.id)});
    return {
        result:{...result, _id:params.id}
    }
}