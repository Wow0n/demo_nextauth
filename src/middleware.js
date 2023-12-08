import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname === "/admin" && req.nextauth.token?.role !== "admin") {
            return new NextResponse("Brak dostępu", {status: 403})
        }
    }
)
export const config = {
    matcher: ["/profile", "/admin"],
}