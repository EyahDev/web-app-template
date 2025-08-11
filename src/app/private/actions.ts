'use client';

import { createClient } from '@/utils/supabase/client';

import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect('/');
  }
}

export async function createAdmin() {
  const supabase = createClient();
  const { error } = await supabase.auth.admin.createUser({ email: 'a.desmet.eu+localhost@gmail.com', password: 'azertyuiop' });

  if (error) {
    console.error(error);
  }
}
