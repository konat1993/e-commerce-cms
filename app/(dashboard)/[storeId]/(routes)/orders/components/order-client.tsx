"use client"

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'
import { OrderColumn, columns } from './table-columns'

type Props = {
    data: OrderColumn[]
}

const OrderClient = ({ data }: Props) => {

    return (
        <>
            <Heading title={`Orders (${data.length})`} description='Manage orders for your store' />

            <Separator />

            <DataTable
                columns={columns}
                data={data}
                searchKey='products'
                filterInputPlaceholder="Search product..."
            />
        </>
    )
}

export default OrderClient