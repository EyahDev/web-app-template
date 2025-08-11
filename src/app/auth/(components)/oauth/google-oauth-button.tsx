import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/app/auth/(components)/oauth/logo/google-logo';
import { signInWithGoogle } from '@/app/auth/(actions)/oauth-actions';

export const GoogleOauthButton = () => {
  return (
    <Button className="w-full" variant="outline" type="button" onClick={signInWithGoogle}>
      <GoogleLogo />
      Se connecter avec Google
    </Button>
  );
};
