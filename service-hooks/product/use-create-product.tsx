import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { CreateProductErrorResponse, CreateProductPayload, CreateProductSuccessResponse } from "@/types/products/create"

const useCreateProduct = () => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<CreateProductPayload, CreateProductSuccessResponse, AxiosError<CreateProductErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.post(`/api/${params.storeId}/products`, payload)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Product created.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while creating product (${errorResponse.message})`)
        }
    })
}

export default useCreateProduct