import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteProductErrorResponse, DeleteProductSuccessResponse } from "@/types/products/delete"

const useDeleteBillboard = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteProductSuccessResponse, AxiosError<DeleteProductErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/${params.storeId}/products/${id || params.productId}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Product successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting product. Make sure you removed all categories using this billboard first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteBillboard