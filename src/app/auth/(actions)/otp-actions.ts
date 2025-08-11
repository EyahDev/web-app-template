'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';
import { SignInFormSchema, SignUpFormSchema } from '@/app/auth/(schema)/otp';

export async function signIn({ email }: z.infer<typeof SignInFormSchema>) {
  try {
    const supabase = await createClient();

    const data = {
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'http://localhost:3000/auth/callback?next=/private'
      }
    };

    const { error } = await supabase.auth.signInWithOtp(data);

    if (error) {
      console.debug(`[MagicLinkSignInFn][SignInError] ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[MagicLinkSignInFn][Error] ${error}`);
    return false;
  }
}

export async function signUp({ email, displayName }: z.infer<typeof SignUpFormSchema>) {
  try {
    const supabase = await createClient();

    const data = {
      email,
      options: {
        shouldCreateUser: true,
        data: { full_name: displayName },
        emailRedirectTo: 'http://localhost:3000/auth/callback?next=/private'
      }
    };

    const { error } = await supabase.auth.signInWithOtp(data);

    if (error) {
      console.debug(`[MagicLinkSignUpFn][SignInError] ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[MagicLinkSignUpFn][Error] ${error}`);
    return false;
  }
}
