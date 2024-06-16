import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { createGuest, getGuest } from "./data-service";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            return !!auth?.user;
        },
        async signIn({ user }) {
            try {
                const guest = await getGuest(user.email);

                if (!guest) {
                    await createGuest({
                        fullName: user.name,
                        email: user.email,
                    });
                }

                return true;
            } catch (error) {
                return false;
            }
        },
        async session({ session }) {
            const guest = await getGuest(session.user.email);
            session.user.id = guest.id;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(authConfig);
