type GetStoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
    "createdAt": Date,
    "updatedAt": Date
}

type GetStoreArgs = ({
    storeId: string
    userId?: string
}) |
    ({
        storeId?: string
        userId: string
    })

type GetStoreErrorResponse = {
    message: string
}

export type {
    GetStoreSuccessResponse,
    GetStoreErrorResponse,
    GetStoreArgs
}