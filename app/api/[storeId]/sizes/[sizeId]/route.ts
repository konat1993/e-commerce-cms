import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib"

type Params = { params: { storeId: string, sizeId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { sizeId } = params

    try {
        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        const sizeResponse = await prisma.size.findUnique({
            where: { id: sizeId },
        })

        return NextResponse.json(sizeResponse)

    } catch (error) {
        console.log('[SIZE_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId, sizeId } = params

    try {
        const { userId } = auth()
        const { name, value } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!value) {
            return new NextResponse("Size value URL is required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
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


        const updateSizeResponse = await prisma.size.updateMany({
            where: { id: sizeId },
            data: { name, value }
        })

        return NextResponse.json(updateSizeResponse)

    } catch (error) {
        console.log('[SIZE_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId, sizeId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const deleteSizedResponse = await prisma.size.deleteMany({
            where: {
                id: sizeId,
            },
        })

        return NextResponse.json(deleteSizedResponse)

    } catch (error) {
        console.log('[SIZES_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
