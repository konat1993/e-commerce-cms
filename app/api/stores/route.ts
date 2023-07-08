import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { name } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prisma?.store.create({ data: { name, userId } })
        console.log({ store })
        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_ROUTE_POST', error)
        return new NextResponse("Internal error", { status: 500 })
    }

}

export async function GET(req: Request) {
    console.log("kupka");

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    console.log({ id })

    return NextResponse.json({ id })
}