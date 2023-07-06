import type { PageServerLoad } from "./$types"
export const load:PageServerLoad = async ({parent}) => {
    const par = await parent()
    return {
        ...par,
    }
}