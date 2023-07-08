"use client"

import React from 'react'
import { Store } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'

import { Heading } from '../ui/heading'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { EditFormValues } from '@/types/store/edit'
import { storeFormSchema } from '@/lib/zod-schemas'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import useEditStore from '@/service-hooks/use-edit-store'
import useDeleteStore from '@/service-hooks/use-delete-store'
import AlertModal from '../modals/alert-modal'
import ApiAlert from '../ui/api-alert'
import useOrigin from '@/hooks/use-origin'

type Props = {
    initialData: Store
}

const SettingsForm = ({ initialData }: Props) => {
    const [open, setOpen] = React.useState(false)
    const params = useParams()
    const origin = useOrigin()

    const form = useForm<EditFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues: initialData
    })

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditStore()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteStore()

    const onSubmit = (values: EditFormValues) => {
        mutateEditQuery({ name: values.name })
    }

    const handleDelete = () => {
        mutateDeleteQuery()
    }

    return (
        <>
            <AlertModal
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => { setOpen(false) }}
                isOpen={open}
            />
            <div className='flex items-center justify-between'>
                <Heading title="Settings" description="Manage store preferences" />
                <Button
                    disabled={isEditing || isDeleting}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>
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
                                        placeholder='Store name'
                                        disabled={isEditing || isDeleting}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button
                        type='submit'
                        disabled={!isDirty || isEditing || isDeleting}
                        className='flex ml-auto'
                    >
                        Save changes
                    </Button>
                </form>
            </Form>

            <Separator />

            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant='public'
                loading={origin === ""}
            />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant='public'
                loading={origin === ""}
            />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant='public'
                loading={origin === ""}
            />
        </>
    )
}

export default SettingsForm