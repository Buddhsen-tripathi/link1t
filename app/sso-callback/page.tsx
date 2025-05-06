'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

const SSOCallback: React.FC = () => {
  const searchParams = useSearchParams();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const afterSignInUrl =
      searchParams.get('after_sign_in_url') || '/profiles';

    const handleSSOCallback = async () => {
      try {
        await handleRedirectCallback({
          afterSignInUrl,
          redirectUrl: afterSignInUrl,
        });
      } catch (error) {
        console.error('SSO Callback Error:', error);
      }
    };

    handleSSOCallback();
  }, [searchParams, handleRedirectCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing single sign-on…</p>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SSOCallback />
    </Suspense>
  );
}