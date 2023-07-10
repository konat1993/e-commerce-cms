import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import BillboardClient from "./components/billboard-client"

type Props = {}

const Billboards = (props: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient />
            </div>
        </div>
    )
}

export default Billboards