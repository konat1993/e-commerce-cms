import { ColorFormValues } from "./form";

type CreateColorSuccessResponse = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateColorPayload = ColorFormValues

type CreateColorErrorResponse = {
    message: string
}


export type {
    CreateColorSuccessResponse,
    CreateColorPayload,
    CreateColorErrorResponse,
}