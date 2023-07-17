"use client"

import React from 'react'
import { Billboard } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { billboardFormSchema } from '@/lib/zod-schemas'
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
import { EditBillboardFormValues } from '@/types/billboards/edit'
import { useCreateBillboard, useDeleteBillboard, useEditBillboard } from '@/service-hooks/billboard'
import ImageUpload from '@/components/ui/image-upload'

type Props = {
    initialData: Billboard | null
}

const BillboardForm = ({ initialData }: Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<EditBillboardFormValues>({
        resolver: zodResolver(billboardFormSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: ""
        }
    })

    const title = initialData ? "Edit billboard" : "Create billboard"
    const description = initialData ? "Edit a billboard" : "Add a new billboard"
    const action = initialData ? "Save changes" : "Create"

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isCreating, mutateQuery: mutateCreateQuery } = useCreateBillboard()

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditBillboard()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteBillboard()



    const onSubmit = ({ label, imageUrl }: EditBillboardFormValues) => {
        if (!initialData) {
            mutateCreateQuery({ label, imageUrl })
        } else {
            mutateEditQuery({ label, imageUrl })
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
                    <FormField name="imageUrl" control={control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={url => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField name="label" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Billboard label'
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

export default BillboardForm