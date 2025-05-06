"use client"

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserProfile,
} from "@clerk/nextjs"

export default function ProfilePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/90" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:20px_20px]" />
      <SignedIn>
          <UserProfile routing="path" path="/profile" />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}