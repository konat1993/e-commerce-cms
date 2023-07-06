import useGetStore from "@/service-hooks/use-get-store"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
    params: { storeId: string }
}

const DashboardLayout = async ({ children, params }: React.PropsWithChildren<Props>) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await useGetStore({ storeId: params.storeId, userId })

    if (!store) {
        redirect("/")
    }

    return (
        <div>
            DashboardLayout
            <div>{children}</div>
        </div>
    )
}

export default DashboardLayout