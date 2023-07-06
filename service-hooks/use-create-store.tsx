import useMutateState from "@/hooks/use-mutate-state"
import { StoreServices } from "@/services"
import { CreateStoreErrorResponse, CreateStorePayload, CreateStoreSuccessResponse } from "@/types/store/create"
import { toast } from "react-hot-toast"
import { AxiosError } from 'axios'

const useCreateStore = () => useMutateState<CreateStorePayload, CreateStoreSuccessResponse, AxiosError<CreateStoreErrorResponse>>({
    mutationFn: (payload) => StoreServices.create(payload),
    onSuccess: (responseData) => {
        toast.success(`You've successfully created the project. (${responseData.name})`)
    },
    onError: (errorResponse) => {
        toast.error(`Something went wrong while creating store (${errorResponse.message})`)
    }
})

export default useCreateStore