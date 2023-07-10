import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib";

import { NextRequest, NextResponse } from "next/server";

type Params = { params: { storeId: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        const { userId } = auth()
        const { name } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const updateStoreResponse = await prisma.store.updateMany({
            where: {
                id: storeId,
            },
            data: {
                name
            }
        })

        return NextResponse.json(updateStoreResponse)

    } catch (error) {
        console.log('[STORE_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const deleteStoreResponse = await prisma.store.deleteMany({
            where: {
                id: storeId,
                userId
            },
        })

        return NextResponse.json(deleteStoreResponse)

    } catch (error) {
        console.log('[STORE_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}