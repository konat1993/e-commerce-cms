"use client"

import useOrigin from '@/hooks/use-origin'
import { useParams } from 'next/navigation'
import React from 'react'
import ApiAlert from './api-alert'

type Props = {
    entityName: string
    entityIdName: string
}

const ApiList = ({ entityName, entityIdName }: Props) => {
    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert
                title='GET'
                description={`${baseUrl}/${entityName}`}
                variant='public'
                loading={origin === ""}
            />
            <ApiAlert
                title='GET'
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant='public'
                loading={origin === ""}
            />
            <ApiAlert
                title='POST'
                description={`${baseUrl}/${entityName}`}
                variant='admin'
                loading={origin === ""}
            />
            <ApiAlert
                title='PATCH'
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant='admin'
                loading={origin === ""}
            />
            <ApiAlert
                title='DELETE'
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                variant='admin'
                loading={origin === ""}
            />
        </>
    )
}

export default ApiList