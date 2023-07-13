import { z } from "zod"

const sizeFormSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
    value: z.string().min(1)
})

export default sizeFormSchema