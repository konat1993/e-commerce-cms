import { storeFormSchema } from "@/lib/zod-schemas"
import { z } from "zod"

type StoreFormValues = z.infer<typeof storeFormSchema>

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