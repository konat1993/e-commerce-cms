import { Billboard, Store } from "@prisma/client"
import { BillboardFormValues } from "./form"

type EditBillboardFormValues = BillboardFormValues // z.infer<typeof billboardFormSchema>

type EditBillboardSuccessResponse = {
    "id": string
    "storeId": string
    "label": string
    "imageUrl": string
    "createdAt": Date
    "updatedAt": Date
    // "store": Store
}

type EditBillboardPayload = EditBillboardFormValues

type EditBillboardErrorResponse = {
    message: string
}


export type {
    EditBillboardFormValues,
    EditBillboardSuccessResponse,
    EditBillboardPayload,
    EditBillboardErrorResponse
}