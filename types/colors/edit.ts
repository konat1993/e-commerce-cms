import { ColorFormValues } from "./form"

type EditColorFormValues = ColorFormValues // z.infer<typeof colorFormSchema>

type EditColorSuccessResponse = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

type EditColorPayload = EditColorFormValues

type EditColorErrorResponse = {
    message: string
}


export type {
    EditColorFormValues,
    EditColorSuccessResponse,
    EditColorPayload,
    EditColorErrorResponse
}