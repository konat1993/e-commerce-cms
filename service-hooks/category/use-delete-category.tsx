import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { DeleteCategorySuccessResponse, DeleteCategoryErrorResponse } from "@/types/categories/delete"

const useDeleteCategory = (id?: string) => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<undefined, DeleteCategorySuccessResponse, AxiosError<DeleteCategoryErrorResponse>>({
        mutationFn: async () => {
            const response = await axios.delete(`/api/${params.storeId}/categories/${params.categoryId || id}`)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category successfully deleted.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while deleting category. Make sure you removed all products using this category first. (${errorResponse.message})`)
        }
    })
}

export default useDeleteCategory