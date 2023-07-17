import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib'
import SettingsForm from '@/components/settings-form'

type Props = {
    params: {
        storeId: string
    }
}

const Settings = async ({ params }: Props) => {
    const { userId } = auth()
    console.log("Settings userId", { userId });


    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prisma.store.findFirst({
        where: { userId, id: params.storeId }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <div className='flex-col'>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default Settings