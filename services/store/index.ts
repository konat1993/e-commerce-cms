import { axios } from "@/lib/axios"
import { CreateStorePayload } from "@/types/store"
import { GetStoreArgs } from "@/types/store/get"

const get = async ({ storeId, userId }: GetStoreArgs) => {
    const response = await prisma?.store.findFirst(
        {
            where:
                { userId, id: storeId }
        })

    return response
}

const create = async (data: CreateStorePayload) => {
    const response = await axios.post("/api/stores", data)
    return response.data
}

const services = { get, create }

export default services