import { ProductFormValues } from "./form";

type CreateProductSuccessResponse = {
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

type CreateProductPayload = ProductFormValues

type CreateProductErrorResponse = {
    message: string
}


export type {
    CreateProductSuccessResponse,
    CreateProductPayload,
    CreateProductErrorResponse,
}