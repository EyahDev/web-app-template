'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export const LogoutButton = () => {
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();

    redirect('/');
  }

  return <button onClick={logout}>logout</button>;
};
