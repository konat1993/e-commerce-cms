import { StoreFormValues } from "./form"

type CreateStoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
}

type CreateStorePayload = StoreFormValues

type CreateStoreErrorResponse = {
    message: string
}


export type {
    CreateStoreSuccessResponse,
    CreateStorePayload,
    CreateStoreErrorResponse,
    StoreFormValues
}