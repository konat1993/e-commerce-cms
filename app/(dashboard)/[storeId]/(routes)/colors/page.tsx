import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import ColorClient from "./components/color-client"
import { prisma } from "@/lib"
import { ColorColumn } from "./components/table-columns"
import { format } from "date-fns"

type Props = {
    params: { storeId: string }
}

const Colors = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const colors = await prisma.color.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" }
    })

    const formattedColors: ColorColumn[] = colors.map(({ id, name, value, createdAt }) => ({
        id, name, value, createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}

export default Colors