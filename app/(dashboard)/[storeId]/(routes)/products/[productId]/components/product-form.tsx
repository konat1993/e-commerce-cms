"use client"

import React from 'react'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { productFormSchema } from '@/lib/zod-schemas'
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
import ImageUpload from '@/components/ui/image-upload'
import { EditProductFormValues } from '@/types/products/edit'
import { useCreateProduct, useDeleteProduct, useEditProduct } from '@/service-hooks/product'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'

type Props = {
    initialData: Product & { images: Image[] } | null
    categories: Category[]
    sizes: Size[]
    colors: Color[]
}

const ProductForm = ({ initialData, categories, sizes, colors }: Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<EditProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
            name: "",
            price: 0,
            images: [],
            categoryId: "",
            colorId: "",
            sizeId: "",
            isFeatured: false,
            isArchived: false

        }
    })

    const title = initialData ? "Edit product" : "Create product"
    const description = initialData ? "Edit a product" : "Add a new product"
    const action = initialData ? "Save changes" : "Create"

    const { handleSubmit, control, formState: { isDirty } } = form

    const { isLoading: isCreating, mutateQuery: mutateCreateQuery } = useCreateProduct()

    const { isLoading: isEditing, mutateQuery: mutateEditQuery } = useEditProduct()

    const { isLoading: isDeleting, mutateQuery: mutateDeleteQuery } = useDeleteProduct()



    const onSubmit = (payload: EditProductFormValues) => {
        if (!initialData) {
            mutateCreateQuery(payload)
        } else {
            mutateEditQuery(payload)
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
                    <FormField name="images" control={control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value.map(image => image.url)}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    multiple
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField name="name" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Product name'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="price" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Price'
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="categoryId" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
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
                                                placeholder='Select a category'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map(({ id, name }) => (
                                            <SelectItem
                                                key={id}
                                                value={id}
                                            >
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="sizeId" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
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
                                                placeholder='Select a size'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sizes.map(({ id, name }) => (
                                            <SelectItem
                                                key={id}
                                                value={id}
                                            >
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="colorId" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className='w-full'
                                                >
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder='Select a color'
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {colors.map(({ id, name, value }) => (
                                                    <>
                                                        <SelectItem
                                                            key={id}
                                                            value={id}
                                                        >
                                                            <div className='flex justify-center items-center gap-x-2 px-4'>

                                                                <span>
                                                                    {name}
                                                                </span>
                                                                <div
                                                                    className="border w-min p-2 rounded-full"
                                                                    style={{ backgroundColor: value }}
                                                                />
                                                            </div>
                                                        </SelectItem>
                                                    </>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="isFeatured" control={control} render={({ field }) => (
                            <FormItem className='flex flex-row items-start space-x-4 space-y-0 border p-4 rounded-md'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange as (checked: CheckedState) => void}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Featured</FormLabel>
                                    <FormDescription onClick={() => field.onChange(!field.value)}>This product will appear on the home page</FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="isArchived" control={control} render={({ field }) => (
                            <FormItem className='flex flex-row items-start space-x-4 space-y-0 border p-4 rounded-md'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange as (checked: CheckedState) => void}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Archived</FormLabel>
                                    <FormDescription
                                        onClick={() => field.onChange(!field.value)}
                                    >
                                        This product will NOT appear on the store
                                    </FormDescription>
                                </div>
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

export default ProductForm