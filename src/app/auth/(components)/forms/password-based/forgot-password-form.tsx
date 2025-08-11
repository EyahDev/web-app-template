'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forgotPassword } from '@/app/auth/(actions)/password-based-actions';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ForgotPasswordFormSchema } from '@/app/auth/(schema)/password-based';

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(form: z.infer<typeof ForgotPasswordFormSchema>) {
    const hasSucceeded = await forgotPassword(form);

    if (hasSucceeded) {
      toast.success('Un lien de récupération vous a été envoyé.');
      redirect('/auth/sign-in');
    } else {
      toast.error('Erreur', { description: "Une erreur s'est produite, veuillez réessayer." });
    }
  }

  return (
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
        <div className="flex items-center">
          <Button className="ml-auto" type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  );
};
