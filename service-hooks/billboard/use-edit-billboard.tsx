import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from "next/navigation"
import { EditBillboardErrorResponse, EditBillboardPayload, EditBillboardSuccessResponse } from "@/types/billboards/edit"

const useEditBillboard = () => {
    const router = useRouter()
    const params = useParams()

    return useMutateState<EditBillboardPayload, EditBillboardSuccessResponse, AxiosError<EditBillboardErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, payload)
            return response.data
        },
        onSuccess: () => {
            router.refresh()
            toast.success("Billboard updated.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while editing billboard (${errorResponse.message})`)
        }
    })
}

export default useEditBillboard