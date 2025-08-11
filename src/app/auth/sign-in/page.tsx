import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GoogleOauthButton } from '@/app/auth/(components)/oauth/google-oauth-button';
import Link from 'next/link';
import { SignInForm } from '@/app/auth/(components)/forms/otp/sign-in-form';

export default function SignInPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="mx-auto">Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <SignInForm />
          <div className="flex items-center gap-2">
            <Separator className="flex-1" /> <span className="shrink-0 text-muted-foreground text-xs">Continuer avec</span> <Separator className="flex-1" />
          </div>

          <GoogleOauthButton />

          <div className="flex items-center gap-2 text-xs">
            <span className="mx-auto ">
              Pas de compte ?
              <Link href="/auth/sign-up" className="ml-1.5 underline underline-offset-4">
                Créez en un
              </Link>
            </span>
          </div>
        </div>
      </CardContent>
    </>
  );
}
