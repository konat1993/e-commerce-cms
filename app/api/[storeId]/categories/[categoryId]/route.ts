import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib"

type Params = { params: { storeId: string, categoryId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { categoryId } = params

    try {
        if (!categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
        }

        const categoryResponse = await prisma.category.findMany({
            where: { id: categoryId },
        })

        return NextResponse.json(categoryResponse)

    } catch (error) {
        console.log('[CATEGORY_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId, categoryId } = params

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
        if (!categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
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

        const updateCategoryResponse = await prisma.category.updateMany({
            where: { id: categoryId },
            data: { name, billboardId, }
        })

        return NextResponse.json(updateCategoryResponse)

    } catch (error) {
        console.log('[CATEGORY_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId, categoryId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const deleteCategoryResponse = await prisma.category.deleteMany({
            where: {
                id: categoryId,
            },
        })

        return NextResponse.json(deleteCategoryResponse)

    } catch (error) {
        console.log('[CATEGORY_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
