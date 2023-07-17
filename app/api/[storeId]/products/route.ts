import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

type Params = { params: { storeId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured")

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const products = await prisma.product.findMany({
            where: {
                storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured === "true" ? true : isFeatured === "false" ? false : undefined,
                isArchived: false,
            },
            include: {
                category: true, color: true, size: true, images: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(products)

    } catch (error) {
        console.log('[PRODUCTS_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }

}

export async function POST(req: NextRequest, { params }: Params) {
    const { storeId } = params

    try {
        const { userId } = auth()
        const { categoryId, sizeId, colorId, isArchived, isFeatured, name, price, images } = await req.json()

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Product name is required", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("Image URL is required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("categoryId is required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("sizeId is required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("colorId is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { userId, id: storeId }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const productResponse = await prisma.product.create({
            data: {
                categoryId,
                colorId,
                name,
                price,
                sizeId,
                isArchived,
                isFeatured,
                storeId,
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        })

        return NextResponse.json(productResponse)

    } catch (error) {
        console.log('[PRODUCTS_ROUTE_POST', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
