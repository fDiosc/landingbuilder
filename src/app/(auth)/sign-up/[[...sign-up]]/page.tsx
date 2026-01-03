import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/10 p-1 shadow-2xl backdrop-blur-xl">
                <SignUp
                    fallbackRedirectUrl="/onboarding"
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 transition-all",
                            card: "bg-transparent shadow-none border-none",
                            headerTitle: "text-white text-2xl font-bold",
                            headerSubtitle: "text-blue-100",
                            socialButtonsBlockButton: "bg-white/20 border-white/10 text-white hover:bg-white/30",
                            socialButtonsBlockButtonText: "text-white font-medium",
                            dividerLine: "bg-white/20",
                            dividerText: "text-blue-200",
                            formFieldLabel: "text-blue-100",
                            formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-blue-300",
                            footerActionText: "text-blue-200",
                            footerActionLink: "text-white font-bold hover:text-blue-100"
                        }
                    }}
                />
            </div>
        </div>
    );
}
