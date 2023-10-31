import { Photo } from "./Photo";

export interface Album {
    id: number,
    userId: number,
    photos: Photo[],
    title: string,
}