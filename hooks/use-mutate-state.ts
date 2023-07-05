import React, { useEffect } from 'react'

type MutationArgTypes<PayloadData, ResponseData> = {
    mutationFn: (payload: PayloadData) => Promise<Response>,
    onSuccess: (responseData: ResponseData, payloadData: PayloadData) => void | Promise<void>

}
const useMutateState = <PayloadData, ResponseData>(
    { mutationFn, onSuccess }: MutationArgTypes<PayloadData, ResponseData>
) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [data, setData] = React.useState<ResponseData | undefined>(undefined)
    const [error, setError] = React.useState<{ error: { message: string } } | undefined>(undefined)

    const makeQuery = React.useCallback(async (payload: PayloadData) => {
        setIsLoading(true)
        try {
            const data = await mutationFn(payload)
            const responseData = await data.json()
            setData(responseData)
            await onSuccess(responseData, payload)
        } catch (queryError: any) {
            setError({ error: queryError?.message })
        } finally {
            setIsSuccess(true)
            setIsLoading(false)
        }
    }, [mutationFn, onSuccess])

    const mutateQuery = (payload: PayloadData) => {
        makeQuery(payload)
    }

    // const successFn = () => {
    //     return onSuccess("some-response-data", payload)
    // }

    // useEffect(() => {
    //     if (isSuccess) {
    //         successFn()
    //     }
    // }, [isSuccess])


    return { data: error ? undefined : data, isLoading, error, isSuccess, mutateQuery }
}

export default useMutateState