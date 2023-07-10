import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

type Params = { params: { storeId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const billboards = await prisma.billboard.findMany({
            where: { storeId }
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARDS_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }

}

export async function POST(req: NextRequest, { params }: Params) {
    const { storeId } = params

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
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { userId, id: storeId }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const billboardResponse = await prisma.billboard.create({
            data: { label, imageUrl, storeId }
        })

        return NextResponse.json(billboardResponse)

    } catch (error) {
        console.log('[BILLBOARDS_ROUTE_POST', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
