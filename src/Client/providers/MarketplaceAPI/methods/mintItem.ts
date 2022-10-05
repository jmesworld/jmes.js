import Axios from "axios";
const FormData = require('form-data');

export interface MintItemParams {
    author: string,
    title: string,
    minPrice: string,
    shares: number,
    genre: string,
    about: string
    image: any
}

export default async function mintItem(mintParams: MintItemParams){
    // @ts-ignore
    const {endpoint} = this;
    const url = `${endpoint.url}/item`;

    console.log({mintParams});

    const formData = new FormData();
    formData.append('image', mintParams.image);

    formData.append('author', mintParams.author);
    formData.append('title', mintParams.title);
    formData.append('minPrice', mintParams.minPrice);
    formData.append('shares', mintParams.shares);
    formData.append('genre', mintParams.genre);
    formData.append('about', mintParams.about);

    return Axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
