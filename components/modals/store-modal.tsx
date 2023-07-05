"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import useMutateState from "@/hooks/use-mutate-state"
import { waitTester } from "@/lib/utils"

type StoreResponse = {
    "id": string,
    "name": string,
    "userId": string,
}


const formSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
})

const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const { data, isLoading, mutateQuery, error } = useMutateState<{ name: string }, StoreResponse>({
        mutationFn: (payload) => fetch("/api/stores", {
            method: "POST",
            body: JSON.stringify({
                ...payload
            })
        }),
        onSuccess: async (responseData, payloadData) => {
            console.log('success', { payloadData })
        }
    })


    const { handleSubmit, control } = form

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // TODO: Create Store
        mutateQuery({ name: values.name })
    }
    console.log({ isLoading, error, data });

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormField name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="E-Commerce"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                                control={control}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default StoreModal