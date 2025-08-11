import { redirect } from 'next/navigation';

import { LogoutButton } from '@/app/private/(components)/logout-button';
import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <p>
      Hello {data.user.email} <LogoutButton />
    </p>
  );
}
