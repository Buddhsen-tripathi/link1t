import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* — Centered SignIn box */}
      <div className="w-full max-w-md p-6 bg-background/80 backdrop-blur-md rounded-lg">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </main>
  );
}