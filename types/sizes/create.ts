import { SizeFormValues } from "./form";

type CreateSizeSuccessResponse = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateSizePayload = SizeFormValues

type CreateSizeErrorResponse = {
    message: string
}


export type {
    CreateSizeSuccessResponse,
    CreateSizePayload,
    CreateSizeErrorResponse,
}