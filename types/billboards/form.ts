import { billboardFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";

type BillboardFormValues = z.infer<typeof billboardFormSchema>

export type {
    BillboardFormValues
}