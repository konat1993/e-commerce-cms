import useMutateState from "@/hooks/use-mutate-state"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { CreateBillboardErrorResponse, CreateBillboardPayload, CreateBillboardSuccessResponse } from "@/types/billboards/create"
import { useParams, useRouter } from "next/navigation"

const useCreateBillboard = () => {
    const params = useParams()
    const router = useRouter()

    return useMutateState<CreateBillboardPayload, CreateBillboardSuccessResponse, AxiosError<CreateBillboardErrorResponse>>({
        mutationFn: async (payload) => {
            const response = await axios.post(`/api/${params.storeId}/billboards`, payload)
            return response.data
        },
        onSuccess: async () => {
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard created.")
        },
        onError: (errorResponse) => {
            toast.error(`Something went wrong while creating billboard (${errorResponse.message})`)
        }
    })
}

export default useCreateBillboard