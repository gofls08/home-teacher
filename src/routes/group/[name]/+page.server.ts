import type { PageServerLoad } from "./$types"
import db from "$lib/db"
import { ObjectId } from "mongodb";
import type { iGroup } from "$lib/type";
export const load:PageServerLoad = async ({parent, params}) => {
    const par = await parent()  
    const collection = db.collection<iGroup>("Group");
    const result = await collection.findOne({name:params});
    return {
        result:{...par, params}
    }
}

