import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteColorErrorResponse, DeleteColorSuccessResponse } from "@/types/colors/delete"

const useDeleteColor = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteColorSuccessResponse, AxiosError<DeleteColorErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/${params.storeId}/colors/${id || params.colorId}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("Color successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting Color. Make sure you removed all categories using this billboard first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteColor