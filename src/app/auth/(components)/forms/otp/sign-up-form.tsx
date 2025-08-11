'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { signUp } from '@/app/auth/(actions)/otp-actions';
import { SignUpFormSchema } from '@/app/auth/(schema)/otp';

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      displayName: ''
    }
  });

  async function onSubmit(form: z.infer<typeof SignUpFormSchema>) {
    const hasSucceeded = await signUp(form);

    if (hasSucceeded) {
      toast.success('Votre compte a bien été créé', {
        description: 'Un email de connexion vous a été envoyé, cliquez sur le lien pour vous connecter.'
      });
    } else {
      toast.error('Erreur', { description: "Une erreur s'est produite, veuillez réessayer." });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full" type="submit">
          Continuer
        </Button>
      </form>
    </Form>
  );
};
