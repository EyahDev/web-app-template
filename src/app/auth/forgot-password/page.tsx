import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ForgotPasswordForm } from '@/app/auth/(components)/forms/password-based/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>Un lien de réinitialisation va vous être envoyé</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </>
  );
}
