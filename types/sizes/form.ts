import { sizeFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";

type SizeFormValues = z.infer<typeof sizeFormSchema>

export type {
    SizeFormValues
}