import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib"

type Params = { params: { storeId: string, billboardId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { billboardId } = params

    try {
        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
        }

        const billboardResponse = await prisma.billboard.findMany({
            where: { id: billboardId },
        })

        return NextResponse.json(billboardResponse)

    } catch (error) {
        console.log('[BILLBOARD_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId, billboardId } = params

    try {
        const { userId } = auth()
        const { label, imageUrl } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!label) {
            return new NextResponse("Label is required", { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 })
        }
        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
        }
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }


        const updateStoreResponse = await prisma.billboard.updateMany({
            where: { id: billboardId },
            data: { label, imageUrl }
        })

        return NextResponse.json(updateStoreResponse)

    } catch (error) {
        console.log('[BILLBOARDS_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId, billboardId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const deleteBillboardResponse = await prisma.billboard.deleteMany({
            where: {
                id: billboardId,
            },
        })

        return NextResponse.json(deleteBillboardResponse)

    } catch (error) {
        console.log('[BILLBOARDS_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
