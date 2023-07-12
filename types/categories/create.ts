import { Category } from "@prisma/client";
import { CategoryFormValues } from "./form";

type CreateCategorySuccessResponse = {
    id: string;
    name: string;
    storeId: string;
    billboardId: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateCategoryPayload = CategoryFormValues

type CreateCategoryErrorResponse = {
    message: string
}


export type {
    CreateCategorySuccessResponse,
    CreateCategoryPayload,
    CreateCategoryErrorResponse,
}