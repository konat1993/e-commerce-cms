"use client"

import React from 'react'
import { Billboard, Category } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { categoryFormSchema } from '@/lib/zod-schemas'
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
import { EditCategoryFormValues } from '@/types/categories/edit'
import { useCreateCategory, useDeleteCategory, useEditCategory } from '@/service-hooks/category'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
    initialData: Category | null
    billboards: Billboard[]
}

const CategoryForm = ({ initialData, billboards }: Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<EditCategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "ss"
        }
    })

    const title = initialData ? "Edit category" : "Create category"
    const description = initialData ? "Edit a category" : "Add a new category"
    const action = initialData ? "Save changes" : "Create"

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isCreating, mutateQuery: mutateCreateQuery } = useCreateCategory()

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditCategory()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteCategory()

    const onSubmit = ({ name, billboardId }: EditCategoryFormValues) => {
        if (!initialData) {
            mutateCreateQuery({ name, billboardId })
        } else {
            mutateEditQuery({ name, billboardId })
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
                                        placeholder='Category name'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="billboardId" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                        >
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder='Select a billboard'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map(({ id, label }) => (
                                            <SelectItem
                                                key={id}
                                                value={id}
                                            >
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

export default CategoryForm