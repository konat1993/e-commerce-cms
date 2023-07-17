import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { EditProductErrorResponse, EditProductPayload, EditProductSuccessResponse } from "@/types/products/edit"

const useEditProduct = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditProductPayload, EditProductSuccessResponse, AxiosError<EditProductErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/${params.storeId}/products/${params.productId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Product updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing product (${errorResponse.message})`)
        }
    })
}

export default useEditProduct