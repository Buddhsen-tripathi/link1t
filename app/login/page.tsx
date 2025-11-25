import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      {/* — Centered SignIn box */}
      <div className="w-full max-w-md p-6 bg-card rounded-lg border border-border">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </main>
  );
}