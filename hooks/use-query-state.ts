import React, { useEffect } from 'react'

type QueryArgTypes<ResponseData, ResponseError> = {
    queryFn: () => Promise<ResponseData>
    onSuccess?: (responseData: ResponseData) => void | Promise<void>
    onError?: (errorResponse: ResponseError) => void | Promise<void>
}
const useMutateState = <ResponseData, ResponseError>(
    { queryFn, onSuccess, onError }: QueryArgTypes<ResponseData, ResponseError>
) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [data, setData] = React.useState<ResponseData | undefined>(undefined)
    const [error, setError] = React.useState<ResponseError | undefined>(undefined)

    const makeQuery = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await queryFn()
            setData(data)
            if (onSuccess) {
                await onSuccess(data)
            }
        } catch (queryError) {
            setError(queryError as ResponseError)
            if (onError) {
                onError(queryError as ResponseError)
            }
        } finally {
            setIsSuccess(true)
            setIsLoading(false)
        }
    }, [queryFn, onError, onSuccess])

    useEffect(() => {
        makeQuery()
    }, [makeQuery])

    return { data: error ? undefined : data, isLoading, error, isSuccess }
}

export default useMutateState