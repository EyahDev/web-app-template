'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { GoogleOauthButton } from '@/app/auth/(components)/oauth/google-oauth-button';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { SignInFormSchema } from '@/app/auth/(schema)/password-based';
import { signIn } from '@/app/auth/(actions)/password-based-actions';

export const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(form: z.infer<typeof SignInFormSchema>) {
    const hasSucceeded = await signIn(form);

    if (hasSucceeded) {
      redirect('/private');
    } else {
      toast.error('Erreur', { description: "Une erreur s'est produite, veuillez réessayer." });
    }
  }

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Votre adresse email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Votre mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center pl-1">
            <Link href="/auth/forgot-password" className="text-sm underline underline-offset-4">
              Mot de passe oublié ?
            </Link>

            <Button className="ml-auto" type="submit">
              Connexion
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex items-center gap-2">
        <Separator className="flex-1" /> <span className="shrink-0 text-muted-foreground text-xs">Continuer avec</span> <Separator className="flex-1" />
      </div>

      <GoogleOauthButton />

      <div className="flex items-center gap-2 text-xs">
        <span className="mx-auto ">
          Pas de compte ?
          <Link href="/auth/sign-up" className="ml-1.5 underline underline-offset-4">
            Créez en un
          </Link>
        </span>
      </div>
    </div>
  );
};
