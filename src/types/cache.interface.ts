import {Article} from "./article.interface.ts";

export interface ArticlesCache {
    [key: string]: Article[]
}