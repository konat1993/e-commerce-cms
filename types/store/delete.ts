type DeleteStoreSuccessResponse = {
    "id": string,
    "name": string,
    "userId": string,
}

// type DeleteStorePayload = {
//     id: string
// }

type DeleteStoreErrorResponse = {
    message: string
}


export type {
    DeleteStoreSuccessResponse,
    // DeleteStorePayload,
    DeleteStoreErrorResponse
}