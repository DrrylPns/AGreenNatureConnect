import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    console.log("===Webhook triggered===")
   
    return NextResponse.json({ message: "===webhook end===" }, { status: 200 })
}