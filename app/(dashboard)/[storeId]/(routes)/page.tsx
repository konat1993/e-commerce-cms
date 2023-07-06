import useGetStore from "@/service-hooks/use-get-store"

type Props = {
    params: { storeId: string }
}

const RoutesPage = async ({ params }: Props) => {
    const store = await useGetStore({ storeId: params.storeId })
    return (
        <div>Dashboard route page - store: {store?.name}</div>
    )
}

export default RoutesPage