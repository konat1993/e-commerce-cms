import { colorFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";

type ColorFormValues = z.infer<typeof colorFormSchema>

export type {
    ColorFormValues
}