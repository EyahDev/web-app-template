import { z } from 'zod';
import { ZodMail, ZodPassword } from '@/app/auth/(schema)/shared';

export const SignInFormSchema = z.object({
  email: z.email({
    message: 'Veuillez saisir votre adresse email.'
  }),
  password: z.string().min(1, {
    message: 'Veuillez saisir votre mot de passe.'
  })
});

export const SignUpFormSchema = z
  .object({
    email: z.email({
      message: 'Veuillez saisir votre adresse email.'
    }),
    displayName: z.string().min(1, {
      message: "Veuillez saisir votre nom d'utilisateur."
    }),
    ...ZodPassword
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmation']
  });

export const ResetPasswordFormSchema = z.object({ ...ZodPassword }).refine((data) => data.password === data.confirmation, {
  message: 'Les mots de passe ne correspondent pas.',
  path: ['confirmation']
});

export const ForgotPasswordFormSchema = z.object({
  ...ZodMail
});
