import Link from "next/link";

export default function LoginMessage() {
    return (
        <div className="grid bg-primary-800 ">
            <p className="text-center text-xl py-12 self-center">
                Please{" "}
                <Link className="underline text-accent-500" href="/login">
                    login
                </Link>{" "}
                to reserve this
                <br /> cabin right now
            </p>
        </div>
    );
}
