import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getPullRequestService } from "./mergeService";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const response = await getPullRequestService(body);
        if (!response) {
            throw new Error('Error occured while fetching pull request')
        }
        return NextResponse.json(response);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: 'Some error occured while getting the response' });
    }
}