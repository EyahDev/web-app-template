'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { headers } from 'next/headers';
import { SignInFormSchema, SignUpFormSchema, ForgotPasswordFormSchema, ResetPasswordFormSchema } from '@/app/auth/(schema)/password-based';

export async function signIn({ email, password }: z.infer<typeof SignInFormSchema>) {
  try {
    const supabase = await createClient();

    const data = {
      email,
      password
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.debug(`[PasswordBasedSignInFn][SignInError] ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[PasswordBasedSignInFn][Error] ${error}`);
    return false;
  }
}

export async function signUp({ email, password, confirmation }: z.infer<typeof SignUpFormSchema>) {
  try {
    const supabase = await createClient();

    if (password !== confirmation) {
      console.debug('[PasswordBasedSignUpFn] Les mots de passe ne correspondent pas.');
      return false;
    }

    const userData = {
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback?next=/private',
        data: { full_name: 'John Doe' }
      }
    };

    const { data, error } = await supabase.auth.signUp(userData);

    console.log(data);

    if (error) {
      console.debug(`[PasswordBasedSignUpFn][SignUpError] ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[PasswordBasedSignUpFn][Error] ${error}`);
    return false;
  }
}

export async function forgotPassword({ email }: z.infer<typeof ForgotPasswordFormSchema>) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/reset-password'
    });

    if (error) {
      console.debug(`[PasswordBasedForgotPasswordFn][Error] ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[PasswordBasedForgotPasswordFn][Error] ${error}`);
    return false;
  }
}

export async function resetPassword({ password }: z.infer<typeof ResetPasswordFormSchema>) {
  try {
    const supabase = await createClient();
    const headersList = await headers();
    const referer = headersList.get('referer');

    if (!referer) {
      console.debug("[ResetPasswordFn] Aucun param d'URL trouvé.");
      return false;
    }

    const url = new URL(referer);
    const code = url.searchParams.get('code');

    if (!code) {
      console.debug("[ResetPasswordFn] Aucun paramètre 'code' trouvé dans le referer.");
      return false;
    }

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data.session) {
      console.debug(`[ResetPasswordFn][ExchangeError] ${exchangeError?.message}`);
      return false;
    }

    await supabase.auth.setSession(data.session);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      console.debug(`[ResetPasswordFn][UpdateError] ${updateError.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.debug(`[ResetPasswordFn][Error] ${error}`);
    return false;
  }
}
