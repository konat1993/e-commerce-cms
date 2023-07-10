import { BillboardFormValues } from "./form";

type CreateBillboardSuccessResponse = {
    id: string;
    storeId: string;
    label: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    // "store": Store
}

type CreateBillboardPayload = BillboardFormValues

type CreateBillboardErrorResponse = {
    message: string
}


export type {
    CreateBillboardSuccessResponse,
    CreateBillboardPayload,
    CreateBillboardErrorResponse,
}