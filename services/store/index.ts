import { axios } from "@/lib/axios"
import { StorePayload } from "@/types/store"

const create = async (data: StorePayload) => {
    const response = await axios.post("/api/stores", data)
    return response.data
}

const services = { create }

export default services