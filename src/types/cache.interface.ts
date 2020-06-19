export interface Cache {
    [key: string]: {
        last: string | null,
        second: string | null
    }
}