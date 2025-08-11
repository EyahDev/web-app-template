'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/app/auth/(actions)/password-based-actions';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { ResetPasswordFormSchema } from '@/app/auth/(schema)/password-based';

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmation: ''
    }
  });

  async function onSubmit(form: z.infer<typeof ResetPasswordFormSchema>) {
    const hasSucceeded = await resetPassword(form);

    if (!hasSucceeded) {
      toast.error('Erreur', { description: 'Veuillez vérifier votre lien de récupération et réessayez.' });
    } else {
      toast.success('Mot de passe réinitialisé', { description: 'Bon retour parmi nous !' });
      redirect('/private'); // TODO à remplacer la véritable route privée
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Nouveau mot de passe" type="password" {...field} />
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
              <FormLabel>Confirmez votre nouveau mot de passe</FormLabel>
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
  );
};
