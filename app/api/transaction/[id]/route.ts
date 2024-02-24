import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT (request:Request, {params}: {params: {id: string}}){
    const data = await request.json()

    try {
        const transactionUpdated = await prisma.transaction.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
        return NextResponse.json(transactionUpdated)
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
    }
}

export async function DELETE (_:Request, {params}: {params: {id: string}}){
    try {
        const transactionRemoved = await prisma.transaction.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json({
            message: `DELETE transaction #${transactionRemoved.id}`
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
    }
}
