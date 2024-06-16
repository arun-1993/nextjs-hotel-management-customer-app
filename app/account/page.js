import { auth } from "../_utils/auth";

export const metadata = {
    title: "Account Home",
};

export default async function Page() {
    const session = await auth();

    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome, {session.user.name}
        </h2>
    );
}
