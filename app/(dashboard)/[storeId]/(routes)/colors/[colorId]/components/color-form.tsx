"use client"

import React from 'react'
import { Color } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { colorFormSchema } from '@/lib/zod-schemas'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AlertModal from '@/components/modals/alert-modal'
import { EditColorFormValues } from '@/types/colors/edit'
import { useCreateColor, useDeleteColor, useEditColor } from '@/service-hooks/color'

type Props = {
    initialData: Color | null
}

const Color = ({ initialData }: Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<EditColorFormValues>({
        resolver: zodResolver(colorFormSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const action = initialData ? "Save changes" : "Create"

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isCreating, mutateQuery: mutateCreateQuery } = useCreateColor()

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditColor()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteColor()



    const onSubmit = ({ name, value }: EditColorFormValues) => {
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
                                        placeholder='Color name'
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
                                    <div className='flex items-center gap-x-4'>
                                        <Input
                                            placeholder='Color value'
                                            disabled={loading}
                                            {...field}
                                        />
                                        <div
                                            className="border p-4 rounded-full"
                                            style={{ backgroundColor: field.value }}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription className='text-xs'>
                                    <span>
                                        Provide color using HEX
                                    </span>
                                    <span className='block'>
                                        E.g. <strong>
                                            #efefef
                                        </strong>
                                    </span>
                                </FormDescription>
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
            </Form >
        </>
    )
}

export default Color