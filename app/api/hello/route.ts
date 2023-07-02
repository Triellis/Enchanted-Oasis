import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function GET(request: NextRequest) {
	return NextResponse.json(
		{
			message: "Hello World!",
		},
		{
			status: 200,
		}
	);
}
