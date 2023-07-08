import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { EditStoreErrorResponse, EditStorePayload, EditStoreSuccessResponse } from "@/types/store/edit"
import { useParams, useRouter } from "next/navigation"

const useEditStore = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditStorePayload, EditStoreSuccessResponse, AxiosError<EditStoreErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/stores/${params.storeId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Store updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing store (${errorResponse.message})`)
        }
    })
}

export default useEditStore