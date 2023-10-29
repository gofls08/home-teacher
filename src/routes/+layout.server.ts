import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';
export const load:LayoutServerLoad = async () => {
     const {
         apiKey,
         authDomain,
         projectId,
         storageBucket,
         messagingSenderId,
         appId,
         AWS_ACCESS,
         AWS_SECRET_ACCESS
     } = env
    return {
        firebaseConfig:{
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,

        },
        aws:{
            AWS_ACCESS,
            AWS_SECRET_ACCESS
        }
    };
}