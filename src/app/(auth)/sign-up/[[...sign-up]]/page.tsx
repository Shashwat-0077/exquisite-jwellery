import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="grid min-h-[calc(100svh-80px)] place-content-center">
            <SignUp />
        </div>
    );
}
