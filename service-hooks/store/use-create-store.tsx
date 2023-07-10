import useMutateState from "@/hooks/use-mutate-state"
import { CreateStoreErrorResponse, CreateStorePayload, CreateStoreSuccessResponse } from "@/types/store/create"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'

const useCreateStore = () => useMutateState<CreateStorePayload, CreateStoreSuccessResponse, AxiosError<CreateStoreErrorResponse>>({
    mutationFn: async (payload) => {
        const response = await axios.post("/api/stores", payload)
        return response.data
    },
    onSuccess: (responseData) => {
        window.location.assign(`/${responseData.id}`)
    },
    onError: (errorResponse) => {
        toast.error(`Something went wrong while creating store (${errorResponse.message})`)
    }
})

export default useCreateStore