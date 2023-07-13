"use client"

import React from 'react'
import { Size } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { sizeFormSchema } from '@/lib/zod-schemas'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AlertModal from '@/components/modals/alert-modal'
import ImageUpload from '@/components/ui/image-upload'
import { EditSizeFormValues } from '@/types/sizes/edit'
import { useCreateSize, useDeleteSize, useEditSize } from '@/service-hooks/size'

type Props = {
    initialData: Size | null
}

const SizeForm = ({ initialData }: Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<EditSizeFormValues>({
        resolver: zodResolver(sizeFormSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })

    const title = initialData ? "Edit size" : "Create size"
    const description = initialData ? "Edit a size" : "Add a new size"
    const action = initialData ? "Save changes" : "Create"

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isCreating, mutateQuery: mutateCreateQuery } = useCreateSize()

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditSize()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteSize()



    const onSubmit = ({ name, value }: EditSizeFormValues) => {
        if (!initialData) {
            mutateCreateQuery({ name, value })
        } else {
            mutateEditQuery({ name, value })
        }
    }

    const handleDelete = async () => {
        mutateDeleteQuery()
    }

    const loading = isCreating || isEditing || isDeleting

    return (
        <>
            <AlertModal
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => { setOpen(false) }}
                isOpen={open}
            />
            <div className='flex items-center justify-between'>
                <Heading title={title} description={description} />
                {!!initialData && <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>}
            </div>

            <Separator />

            <Form {...form}>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-8 w-full'
                >
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField name="name" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Size name'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="value" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Size value'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button
                        type='submit'
                        disabled={!isDirty || loading}
                        className='flex ml-auto'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default SizeForm