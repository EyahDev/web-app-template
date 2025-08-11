'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { SignInFormSchema } from '@/app/auth/(schema)/otp';
import { signIn } from '@/app/auth/(actions)/otp-actions';

export const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(form: z.infer<typeof SignInFormSchema>) {
    const hasSucceeded = await signIn(form);

    if (hasSucceeded) {
      toast.success('Un email de connexion vous a été envoyé', { description: 'Cliquez sur le lien pour vous connecter' });
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
        <Button className="w-full" type="submit">
          Connexion
        </Button>
      </form>
    </Form>
  );
};
