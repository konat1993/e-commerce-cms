import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import SizeClient from "./components/size-client"
import { prisma } from "@/lib"
import { SizeColumn } from "./components/table-columns"
import { format } from "date-fns"

type Props = {
    params: { storeId: string }
}

const Sizes = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const sizes = await prisma.size.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" }
    })

    const formattedSizes: SizeColumn[] = sizes.map(({ id, name, value, createdAt }) => ({
        id, name, value, createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}

export default Sizes