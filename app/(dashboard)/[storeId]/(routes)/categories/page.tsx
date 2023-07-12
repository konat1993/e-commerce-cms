import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import CategoryClient from "./components/category-client"
import { prisma } from "@/lib"
import { CategoryColumn } from "./components/table-columns"
import { format } from "date-fns"

type Props = {
    params: { storeId: string }
}

const Categories = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const categories = await prisma.category.findMany({
        where: { storeId },
        include: { billboard: true },
        orderBy: { createdAt: "desc" }
    })

    const formattedCategories: CategoryColumn[] = categories.map(({
        id,
        name,
        billboard,
        createdAt
    }) => ({
        id,
        name,
        billboardLabel: billboard.label,
        createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default Categories