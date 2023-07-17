import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib"

type Params = { params: { storeId: string, productId: string } }

export async function GET(req: NextRequest, { params }: Params) {
    const { productId } = params

    try {
        if (!productId) {
            return new NextResponse("Product ID is required", { status: 400 })
        }

        const productResponse = await prisma.product.findUnique({
            where: { id: productId },
            include: { category: true, color: true, size: true, images: true }
        })

        return NextResponse.json(productResponse)

    } catch (error) {
        console.log('[PRODUCT_ROUTE_GET', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { storeId, productId } = params

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
        if (!productId) {
            return new NextResponse("ProductId is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }


        await prisma.product.update({
            where: { id: productId },
            include: { images: true },
            data: {
                categoryId, colorId, isArchived, isFeatured, name, price, sizeId,
                images: {
                    deleteMany: {}
                }
            }
        })

        const updateProductResponse = await prisma.product.update({
            where: { id: productId },
            data: {
                images: {
                    createMany: { data: [...images.map((image: { url: string }) => image)] }
                }
            }
        })

        return NextResponse.json(updateProductResponse)

    } catch (error) {
        console.log('[PRODUCTS_ROUTE_PATCH', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { storeId, productId } = params

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!productId) {
            return new NextResponse("Product ID is required", { status: 400 })
        }

        const storeByUserId = await prisma.store.findFirst({
            where: { id: storeId, userId }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const deleteProductResponse = await prisma.product.deleteMany({
            where: {
                id: productId,
            },
        })

        return NextResponse.json(deleteProductResponse)

    } catch (error) {
        console.log('[PRODUCTS_ROUTE_DELETE', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
