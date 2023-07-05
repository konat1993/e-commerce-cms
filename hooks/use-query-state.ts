import React, { useEffect } from 'react'

const useQueryState = ({ queryFn }: { queryFn: () => Promise<any> }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [data, setData] = React.useState(undefined)
    const [error, setError] = React.useState<{ error: { message: string } } | undefined>(undefined)

    const makeQuery = React.useCallback(() => {
        async () => {
            setIsLoading(true)

            try {
                const data = await queryFn()
                setData(data)
            } catch (queryError: any) {
                setError({ error: queryError?.message })
            } finally {
                setIsLoading(false)
            }
        }
    }, [queryFn])

    const invokeQuery = () => {
        makeQuery()
    }


    useEffect(() => {
        makeQuery()
    }, [makeQuery])
    console.log("test");

    return { data, isLoading, error, invokeQuery }
}

export default useQueryState