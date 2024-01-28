import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: "/login",
    }
})

export const config = {
    matcher: [
        "/create/:path*",
        "/posts/:path*",
        "/profile/:path*",
        "/:path*"
    ]
};