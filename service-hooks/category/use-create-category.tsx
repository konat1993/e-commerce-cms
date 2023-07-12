import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { CreateCategoryErrorResponse, CreateCategoryPayload, CreateCategorySuccessResponse } from "@/types/categories/create"
import { useParams, useRouter } from "next/navigation"

const useCreateCategory = () => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<CreateCategoryPayload, CreateCategorySuccessResponse, AxiosError<CreateCategoryErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.post(`/api/${params.storeId}/categories`, payload)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category created.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while creating category (${errorResponse.message})`)
        }
    })
}

export default useCreateCategory