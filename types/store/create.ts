type CreateStoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
}

type CreateStorePayload = {
    name: string
}

type CreateStoreErrorResponse = {
    message: string
}

export type {
    CreateStoreSuccessResponse,
    CreateStorePayload,
    CreateStoreErrorResponse
}