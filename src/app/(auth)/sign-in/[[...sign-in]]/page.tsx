import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
    return (
        <div className="grid min-h-[calc(100svh-80px)] place-content-center">
            <ClerkLoaded>
                <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading>
                <Loader2 className="animate-spin text-gray-400" />
            </ClerkLoading>
        </div>
    );
}
