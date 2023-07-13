import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib"

type Params = { params: { storeId: string, colorId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { colorId } = params

    try {
        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
        }

        const colorResponse = await prisma.color.findUnique({
            where: { id: colorId },
        })

        return NextResponse.json(colorResponse)

    } catch (error) {
        console.log('[COLOR_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId, colorId } = params

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
            return new NextResponse("Color value URL is required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
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


        const updateColorResponse = await prisma.color.updateMany({
            where: { id: colorId },
            data: { name, value }
        })

        return NextResponse.json(updateColorResponse)

    } catch (error) {
        console.log('[COLOR_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId, colorId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const deleteColorResponse = await prisma.color.deleteMany({
            where: {
                id: colorId,
            },
        })

        return NextResponse.json(deleteColorResponse)

    } catch (error) {
        console.log('[COLORs_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
