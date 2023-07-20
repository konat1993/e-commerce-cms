import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { prisma } from "@/lib"
import { OrderColumn } from "./components/table-columns"
import { format } from "date-fns"
import { formatter } from "@/lib/utils"
import OrderClient from "./components/order-client"

type Props = {
    params: { storeId: string }
}

const Orders = async ({ params: { storeId } }: Props) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const orders = await prisma.order.findMany({
        where: { storeId },
        include: {
            orderItems: { include: { product: true } }
        },
        orderBy: { createdAt: "desc" }
    })

    const formattedOrders: OrderColumn[] = orders.map(({ id, phone, address, isPaid, orderItems, createdAt }) => ({
        id, phone, address, isPaid,
        products: orderItems.map(orderItem => orderItem.product.name).join(", "),
        totalPrice: formatter.format(orderItems.reduce((total, orderItem) => {
            return total + Number(orderItem.product.price)
        }, 0)),
        createdAt: format(createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default Orders