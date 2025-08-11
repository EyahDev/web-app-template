import { z } from 'zod';
import { ZodMail } from '@/app/auth/(schema)/shared';

export const SignInFormSchema = z.object({
  ...ZodMail
});

export const SignUpFormSchema = z.object({
  ...ZodMail,
  displayName: z.string().min(3, {
    message: "Veuillez saisir votre nom d'utilisateur."
  })
});
