import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { CreateSizeErrorResponse, CreateSizePayload, CreateSizeSuccessResponse } from "@/types/sizes/create"

const useCreateSize = () => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<CreateSizePayload, CreateSizeSuccessResponse, AxiosError<CreateSizeErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.post(`/api/${params.storeId}/sizes`, payload)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size created.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while creating size (${errorResponse.message})`)
        }
    })
}

export default useCreateSize