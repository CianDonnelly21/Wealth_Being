'use client';

import { useEffect, useState } from 'react';

export default function useRequireAuth() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const response = await fetch('/server/session/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          window.location.href = '/client/login';
          return;
        }
      } catch (error) {
        window.location.href = '/client/login';
        return;
      } finally {
        if (mounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  return isCheckingAuth;
}
