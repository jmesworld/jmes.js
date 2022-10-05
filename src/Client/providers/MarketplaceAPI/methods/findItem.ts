import Axios from "axios";


export interface FindItemParams {
    author?: string,
    title?: string,
    genre?: string,
}

export default async function findItem(findParams: FindItemParams){
    console.log('Find Item for search', findParams);

    console.log({findParams})
};
