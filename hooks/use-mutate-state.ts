import React from 'react'

type MutationArgTypes<PayloadData, ResponseData, ResponseError> = {
    mutationFn: (payload: PayloadData) => Promise<ResponseData>
    onSuccess?: (responseData: ResponseData, payloadData: PayloadData) => void | Promise<void>
    onError?: (errorResponse: ResponseError) => void | Promise<void>
}
const useMutateState = <PayloadData, ResponseData, ResponseError>(
    { mutationFn, onSuccess, onError }: MutationArgTypes<PayloadData, ResponseData, ResponseError>
) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [data, setData] = React.useState<ResponseData | undefined>(undefined)
    const [error, setError] = React.useState<{ error: { message: string } } | undefined>(undefined)

    const makeQuery = React.useCallback(async (payload: PayloadData) => {
        setIsLoading(true)
        try {
            const data = await mutationFn(payload)
            setData(data)
            if (onSuccess) {
                await onSuccess(data, payload)
            }
        } catch (queryError: any) {
            setError({ error: queryError?.message })
            if (onError) {
                onError(queryError.message)
            }
        } finally {
            setIsSuccess(true)
            setIsLoading(false)
        }
    }, [mutationFn, onError, onSuccess])

    const mutateQuery = (payload: PayloadData) => {
        makeQuery(payload)
    }

    return { data: error ? undefined : data, isLoading, error, isSuccess, mutateQuery }
}

export default useMutateState