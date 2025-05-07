export type MessageButton = {
    content: string,
    id: string,
    enabled?: (data: any) => boolean
}