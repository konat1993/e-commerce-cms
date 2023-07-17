import { auth } from "@clerk/nextjs"
import { redirect, useParams } from "next/navigation"
import BillboardClient from "./components/billboard-client"
import { prisma } from "@/lib"
import { BillboardColumn } from "./components/table-columns"
import { format } from "date-fns"

type Props = {
    params: { storeId: string }
}

const Billboards = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()
    console.log("Billboards userId", { userId })
    if (!userId) {
        redirect("/sign-in")
    }

    const billboards = await prisma.billboard.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map(({ id, label, createdAt }) => ({
        id, label, createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    )
}

export default Billboards