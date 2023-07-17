import { productFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";

type ProductFormValues = z.infer<typeof productFormSchema>

export type {
    ProductFormValues
}