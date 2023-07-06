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
    const [error, setError] = React.useState<ResponseError | undefined>(undefined)

    const makeQuery = React.useCallback(async (payload: PayloadData) => {
        setIsLoading(true)
        try {
            const responseData = await mutationFn(payload)
            setData(responseData)
            if (onSuccess) {
                await onSuccess(responseData, payload)
                setIsSuccess(true)
            }
            return { responseData }
        } catch (queryError) {
            setError(queryError as ResponseError)
            if (onError) {
                await onError(queryError as ResponseError)
            }
            return { error: queryError }
        } finally {
            setIsLoading(false)
        }
    }, [mutationFn, onError, onSuccess])

    const mutateQuery = (payload: PayloadData) => {
        makeQuery(payload)
    }

    const mutateAsyncQuery = async (payload: PayloadData) => {
        const response = await makeQuery(payload)

        return response
    }

    return { data: error ? undefined : data, isLoading, error, isSuccess, mutateQuery, mutateAsyncQuery }
}

export default useMutateState