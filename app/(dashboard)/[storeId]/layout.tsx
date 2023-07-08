import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prisma from "../../../lib/prismadb"
import Navbar from "@/components/navbar"

type Props = {
    params: { storeId: string }
}

const DashboardLayout = async ({ children, params }: React.PropsWithChildren<Props>) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prisma?.store.findFirst(
        {
            where:
                { userId, id: params.storeId }
        })

    if (!store) {
        redirect("/")
    }

    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    )
}

export default DashboardLayout