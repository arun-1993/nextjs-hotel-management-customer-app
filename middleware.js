import { auth } from "./app/_utils/auth";

export const middleware = auth;

export const config = {
    matcher: ["/account/:path*"],
};
