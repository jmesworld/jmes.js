export interface MintItemParams {
    author: string;
    title: string;
    minPrice: string;
    shares: number;
    genre: string;
    about: string;
    image: any;
}
export default function mintItem(mintParams: MintItemParams): Promise<import("axios").AxiosResponse<any, any>>;
