import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordForm } from '@/app/auth/(components)/forms/password-based/reset-password-form';

type Params = Promise<{ error: string; code: string }>;
type Props = { searchParams: Params };

export default async function ResetPasswordPage({ searchParams }: Readonly<Props>) {
  const { code, error } = await searchParams;

  return (
    <>
      <CardHeader>
        <CardTitle>Récupération de votre mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        {(error || !code) && <p className="leading-7 [&:not(:first-child)]:mt-6">Ce lien a expiré ou n‘est plus valide.</p>}
        {!error && code && <ResetPasswordForm />}
      </CardContent>
    </>
  );
}
