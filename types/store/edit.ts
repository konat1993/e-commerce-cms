import { StoreFormValues } from "./create";

type EditFormValues = StoreFormValues // z.infer<typeof storeFormSchema>

type EditStoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
}

type EditStorePayload = EditFormValues

type EditStoreErrorResponse = {
    message: string
}


export type {
    EditFormValues,
    EditStoreSuccessResponse,
    EditStorePayload,
    EditStoreErrorResponse
}