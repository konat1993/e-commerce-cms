import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteSizeErrorResponse, DeleteSizeSuccessResponse } from "@/types/sizes/delete"

const useDeleteSize = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteSizeSuccessResponse, AxiosError<DeleteSizeErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/${params.storeId}/sizes/${id || params.sizeId}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting size. Make sure you removed all categories using this billboard first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteSize