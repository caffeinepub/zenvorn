import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Article {
    id: bigint;
    title: string;
    readingTime: string;
    content: string;
    date: string;
    slug: string;
    isBreaking: boolean;
    author: string;
    imageUrl: string;
    isFeatured: boolean;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    getArticleById(id: bigint): Promise<Article>;
    getArticles(): Promise<Array<Article>>;
    getArticlesByCategory(category: string): Promise<Array<Article>>;
    getBreakingArticles(): Promise<Array<Article>>;
    getFeaturedArticles(): Promise<Array<Article>>;
    searchArticles(searchTerm: string): Promise<Array<Article>>;
}
