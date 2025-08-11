import { z } from 'zod';

export const ZodMail = {
  email: z.email({
    message: 'Veuillez saisir votre adresse email.'
  })
};

export const ZodPassword = {
  password: z
    .string()
    .min(8, {
      message: 'Le mot de passe doit contenir au moins 8 caractères.'
    })
    .regex(/[A-Z]/, {
      message: 'Le mot de passe doit contenir au moins une majuscule.'
    })
    .regex(/[a-z]/, {
      message: 'Le mot de passe doit contenir au moins une minuscule.'
    })
    .regex(/\d/, {
      message: 'Le mot de passe doit contenir au moins un chiffre.'
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Le mot de passe doit contenir au moins un caractère spécial.'
    }),
  confirmation: z.string().min(8, {
    message: 'Veuillez confirmer votre mot de passe.'
  })
};
