export interface Rol {
    description: string,
    name: string,
    permits?: [
        {
            method: string,
            name: string,
            uuid: string
        }
    ],
    uuid: string
}