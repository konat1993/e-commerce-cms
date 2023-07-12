import { categoryFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";

type CategoryFormValues = z.infer<typeof categoryFormSchema>

export type {
    CategoryFormValues
}