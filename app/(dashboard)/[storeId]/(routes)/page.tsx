import { prisma } from "@/lib"

type Props = {
    params: { storeId: string }
}

const RoutesPage = async ({ params }: Props) => {
    const store = await prisma.store.findFirst(
        {
            where:
                { id: params.storeId }
        })

    return (
        <div>Dashboard route page - store: {store?.name}</div>
    )
}

export default RoutesPage