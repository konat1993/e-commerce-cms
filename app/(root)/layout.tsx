import { auth } from '@clerk/nextjs'
import axios from 'axios'
import { redirect } from 'next/navigation'
import prisma from "../../lib/prismadb"

const SetupLayout = async ({ children }: React.PropsWithChildren) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prisma?.store.findFirst(
        {
            where:
                { userId }
        })

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <div>{children}</div>
    )
}

export default SetupLayout