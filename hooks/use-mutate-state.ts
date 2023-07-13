import React from 'react'

// type RequireIfNotUndefined<T> = T extends undefined ? undefined : Required<T>;

// type RequirePayload<PayloadData> = PayloadData extends undefined ? [] : [payload: RequireIfNotUndefined<PayloadData>];
type RequirePayload<PayloadData> = PayloadData extends undefined ? [] : [payload: PayloadData];

type MutationArgTypes<PayloadData, ResponseData, ResponseError> =
    PayloadData extends undefined
    ? {
        mutationFn: () => Promise<ResponseData>;
        onSuccess?: (responseData?: ResponseData) => any;
        onError?: (errorResponse: ResponseError) => any;
        onFinally?: () => any;
    }
    : {
        mutationFn: (payload?: PayloadData) => Promise<ResponseData>;
        onSuccess?: (responseData: ResponseData, payloadData: PayloadData) => any;
        onError?: (errorResponse: ResponseError) => any;
        onFinally?: () => any;
    };

const useMutateState = <PayloadData, ResponseData, ResponseError>(
    { mutationFn, onSuccess, onError, onFinally }: MutationArgTypes<PayloadData, ResponseData, ResponseError>
) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [data, setData] = React.useState<ResponseData | undefined>(undefined)
    const [error, setError] = React.useState<ResponseError | undefined>(undefined)

    const makeQuery = React.useCallback(async (payload?: PayloadData) => {
        setIsLoading(true)
        try {
            const responseData = await mutationFn(payload)
            setData(responseData)
            if (onSuccess) {
                await onSuccess(responseData, payload as PayloadData)
                setIsSuccess(true)
            }
            return { responseData, status: "success" }
        } catch (queryError) {
            setError(queryError as ResponseError)
            if (onError) {
                await onError(queryError as ResponseError)
            }
            return { error: queryError, status: "error" }
        } finally {
            if (onFinally) {
                await onFinally()
            }
            setIsLoading(false)
        }
    }, [mutationFn, onError, onFinally, onSuccess])

    const mutateQuery = (...args: RequirePayload<PayloadData>) => {
        makeQuery(...args);
    };

    const mutateAsyncQuery = async (...args: RequirePayload<PayloadData>) => {
        const response = await makeQuery(...args);
        return response
    }

    return { data, isLoading, error, isSuccess, mutateQuery, mutateAsyncQuery }
}

export default useMutateState