"use client"

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'
import { BillboardColumn, columns } from './table-columns'

type Props = {
    data: BillboardColumn[]
}

const BillboardClient = ({ data }: Props) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Billboards (${data.length})`} description='Manage billboards for your store' />
                <Button onClick={() => { router.push(`/${params.storeId}/billboards/new`) }}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={data}
                searchKey='label'
            />
        </>
    )
}

export default BillboardClient