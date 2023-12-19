import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST (
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json()

        const { name } = body;

        if(!userId){
            return new NextResponse("No tienes autorización.", {status: 401})
        }

        if(!name){
            return new NextResponse("Se requiere el nombre", {status: 400})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STOREs_POST]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}