"use client"

import React from 'react'
import { SizeColumn } from './table-columns'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import { useDeleteSize } from '@/service-hooks/size'

type Props = {
    data: SizeColumn
}

const TableActionCell = ({ data }: Props) => {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Size ID copied to clipboard!")
    }

    const { mutateAsyncQuery: mutateDeleteQuery, isLoading: isDeleting } = useDeleteSize(data.id)

    const handleDelete = async () => {
        await mutateDeleteQuery()
        setOpen(false)
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setOpen(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='w-8 h-8 p-0'
                    >
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='w-4 h-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* This also works: <DropdownMenuItem onClick={() => router.push(`billboards/${data.id}`)}><Edit className='mr-2 w-4 h-4' /> Update</DropdownMenuItem> */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
                    >
                        <Edit className='mr-2 w-4 h-4' />
                        <span>Update</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className='mr-2 w-4 h-4' />
                        <span>Copy Id</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className='text-destructive'
                    >
                        <Trash className='mr-2 w-4 h-4' />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default TableActionCell