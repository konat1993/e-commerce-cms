import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import ProductClient from "./components/product-client"
import { prisma } from "@/lib"
import { ProductColumn } from "./components/table-columns"
import { format } from "date-fns"
import { formatter } from "@/lib/utils"

type Props = {
    params: { storeId: string }
}

const Products = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const products = await prisma.product.findMany({
        where: { storeId },
        include: { category: true, size: true, color: true },
        orderBy: { createdAt: "desc" }
    })

    const formattedProducts: ProductColumn[] = products.map(({
        id, name, isFeatured, isArchived, price,
        category, size, color, createdAt
    }) => ({
        id, name, isFeatured, isArchived,
        category: category.name,
        size: size.name,
        color: color.value,
        price: formatter.format(price.toNumber()),
        createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    )
}

export default Products