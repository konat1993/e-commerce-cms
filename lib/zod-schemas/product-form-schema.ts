import { z } from "zod"

const productFormSchema = z.object({
    name: z.string().min(3, { message: "String must contain at least 3 character(s)" }),
    images: z.object(
        { url: z.string() }
    ).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
})

export default productFormSchema