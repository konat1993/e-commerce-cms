import { z } from "zod"

const storeFormSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
})

export default storeFormSchema