import { z } from "zod"

const categoryFormSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
    billboardId: z.string().min(1)
})

export default categoryFormSchema