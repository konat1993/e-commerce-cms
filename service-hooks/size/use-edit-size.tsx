import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { EditSizeErrorResponse, EditSizePayload, EditSizeSuccessResponse } from "@/types/sizes/edit"

const useEditSize = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditSizePayload, EditSizeSuccessResponse, AxiosError<EditSizeErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Size updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing size (${errorResponse.message})`)
        }
    })
}

export default useEditSize