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

        const categoriesResponse = await prisma.category.findMany({
            where: { storeId }
        })

        return NextResponse.json(categoriesResponse)

    } catch (error) {
        console.log('[CATEGORIES_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }

}

export async function POST(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        const { userId } = auth()
        const { name, billboardId } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 })
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

        const categoryResponse = await prisma.category.create({
            data: { name, billboardId, storeId }
        })

        return NextResponse.json(categoryResponse)

    } catch (error) {
        console.log('[CATEGORIES_ROUTE_POST', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
