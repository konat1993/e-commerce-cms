type StoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
}

type StorePayload = {
    name: string
}

type StoreErrorResponse = {
    message: string
}

export type {
    StoreSuccessResponse, StorePayload, StoreErrorResponse
}