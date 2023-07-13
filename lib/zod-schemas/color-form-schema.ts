import { z } from "zod"

const colorFormSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
    value: z.string().min(4).regex(/^#/, { message: "String must be a valid hex code" })
})

export default colorFormSchema