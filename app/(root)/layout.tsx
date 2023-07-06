import useGetStore from '@/service-hooks/use-get-store'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const SetupLayout = async ({ children }: React.PropsWithChildren) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await useGetStore({ userId })

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <div>{children}</div>
    )
}

export default SetupLayout