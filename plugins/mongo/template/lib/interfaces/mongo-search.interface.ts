export interface MongoSearch {
    sort?: { [key: string]: 1 | -1 };
    limit?: number;
}