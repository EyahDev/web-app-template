'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { SignUpFormSchema } from '@/app/auth/(schema)/password-based';
import { signUp } from '@/app/auth/(actions)/password-based-actions';

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmation: ''
    }
  });

  async function onSubmit(form: z.infer<typeof SignUpFormSchema>) {
    const hasSucceeded = await signUp(form);

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
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Nom d'utilisateur"}</FormLabel>
                <FormControl>
                  <Input placeholder="Martine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@mail.com" {...field} />
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
                <FormLabel>Votre mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Mot de passe" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmez votre mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Confirmation" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Button className="ml-auto" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}Envoyer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
