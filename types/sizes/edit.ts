import { SizeFormValues } from "./form"

type EditSizeFormValues = SizeFormValues // z.infer<typeof billboardFormSchema>

type EditSizeSuccessResponse = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

type EditSizePayload = EditSizeFormValues

type EditSizeErrorResponse = {
    message: string
}


export type {
    EditSizeFormValues,
    EditSizeSuccessResponse,
    EditSizePayload,
    EditSizeErrorResponse
}