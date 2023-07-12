import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { EditCategoryErrorResponse, EditCategoryPayload, EditCategorySuccessResponse } from "@/types/categories/edit"

const useEditCategory = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditCategoryPayload, EditCategorySuccessResponse, AxiosError<EditCategoryErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Category updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing category (${errorResponse.message})`)
        }
    })
}

export default useEditCategory