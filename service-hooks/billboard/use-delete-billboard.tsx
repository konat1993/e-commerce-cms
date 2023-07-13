import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteBillboardErrorResponse, DeleteBillboardSuccessResponse } from "@/types/billboards/delete"

const useDeleteBillboard = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteBillboardSuccessResponse, AxiosError<DeleteBillboardErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/${params.storeId}/billboards/${id || params.billboardId}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting billboard. Make sure you removed all categories using this billboard first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteBillboard