import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/app/auth/(components)/forms/otp/sign-up-form';

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>{"Création d'un compte"}</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </>
  );
}
