import { CategoryFormValues } from "./form"

type EditCategoryFormValues = CategoryFormValues // z.infer<typeof CategoryFormSchema>

type EditCategorySuccessResponse = {
    id: string;
    name: string;
    storeId: string;
    billboardId: string;
    createdAt: Date;
    updatedAt: Date;
}

type EditCategoryPayload = EditCategoryFormValues

type EditCategoryErrorResponse = {
    message: string
}


export type {
    EditCategoryFormValues,
    EditCategorySuccessResponse,
    EditCategoryPayload,
    EditCategoryErrorResponse
}