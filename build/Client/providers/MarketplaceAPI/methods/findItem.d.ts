export interface FindItemParams {
    author?: string;
    title?: string;
    genre?: string;
}
export default function findItem(findParams: FindItemParams): Promise<void>;
