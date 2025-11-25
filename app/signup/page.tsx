import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      {/* — Centered SignUp box */}
      <div className="w-full max-w-md p-6 bg-card rounded-lg border border-border">
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login"
        />
      </div>
    </main>
  );
}