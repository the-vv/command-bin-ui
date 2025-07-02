export interface IApiError {
    message: string,
    error: string,
    statusCode: number
}

export enum ESource {
    FOLDER = 'folder',
    CATEGORY = 'category',
    RECENT = 'recent',
    FAVORITES = 'favorites',
    // FREQUENT = 'frequent',
}