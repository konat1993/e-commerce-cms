"use client"

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'
import { ProductColumn, columns } from './table-columns'
import ApiList from '@/components/ui/api-list'

type Props = {
    data: ProductColumn[]
}

const ProductClient = ({ data }: Props) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Products (${data.length})`} description='Manage products for your store' />
                <Button onClick={() => { router.push(`/${params.storeId}/products/new`) }}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable
                columns={columns}
                data={data}
                searchKey='name'
                filterInputPlaceholder="Search products..."
            />

            <div className='pt-6' />
            <Heading title='API' description='API calls for Products' />
            <ApiList entityName='products' entityIdName='productsId' />
        </>
    )
}

export default ProductClient