import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { EditColorErrorResponse, EditColorPayload, EditColorSuccessResponse } from "@/types/colors/edit"

const useEditColor = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditColorPayload, EditColorSuccessResponse, AxiosError<EditColorErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Color updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing color (${errorResponse.message})`)
        }
    })
}

export default useEditColor