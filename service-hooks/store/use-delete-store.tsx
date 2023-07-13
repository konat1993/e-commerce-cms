import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteStoreErrorResponse, DeleteStoreSuccessResponse } from "@/types/store/delete"

const useDeleteStore = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteStoreSuccessResponse, AxiosError<DeleteStoreErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/stores/${id || params.storeId}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push("/")
            toast.success("Store successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting store. Make sure you removed all products and categories first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteStore