import React from 'react'

const useMounted = () => {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    return isMounted
}

export default useMounted