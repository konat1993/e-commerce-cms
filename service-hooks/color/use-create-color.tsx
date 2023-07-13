import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { CreateColorErrorResponse, CreateColorPayload, CreateColorSuccessResponse } from "@/types/colors/create"

const useCreateColor = () => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<CreateColorPayload, CreateColorSuccessResponse, AxiosError<CreateColorErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.post(`/api/${params.storeId}/colors`, payload)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("Color created.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while creating color (${errorResponse.message})`)
        }
    })
}

export default useCreateColor