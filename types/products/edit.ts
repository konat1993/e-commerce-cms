import { ProductFormValues } from "./form"

type EditProductFormValues = ProductFormValues // z.infer<typeof productFormSchema>

type EditProductSuccessResponse = {
    id: string;
    name: string;
    price: number;
    isFeatured: boolean;
    isArchived: boolean;
    storeId: string;
    categoryId: string;
    sizeId: string;
    colorId: string;
    createdAt: Date;
    updatedAt: Date;
}

type EditProductPayload = EditProductFormValues

type EditProductErrorResponse = {
    message: string
}


export type {
    EditProductFormValues,
    EditProductSuccessResponse,
    EditProductPayload,
    EditProductErrorResponse
}