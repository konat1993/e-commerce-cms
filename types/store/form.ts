import { storeFormSchema } from "@/lib/zod-schemas"
import { z } from "zod"

type StoreFormValues = z.infer<typeof storeFormSchema>

export type {
    StoreFormValues
}