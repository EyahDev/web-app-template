import { AlertCircleIcon, SquareCheckBig, SquareX } from 'lucide-react';
import { TutorialStep } from '@/components/tutorial/tutorial-step';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
  const config = [
    { label: 'Public Supabase URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL },
    { label: 'Supabase anon KEY', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
    { label: 'Supabase Service KEY', value: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY }
  ];

  return (
    <div className="min-h-screen p-8">
      <main>
        <div className="flex gap-6">
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Configuration</h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {[...config].map(({ label, value }) => (
                <li className="flex items-center gap-4" key={label}>
                  {value ? <SquareCheckBig className="text-green-700" /> : <SquareX className="text-red-600" />} {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-auto">
            <Alert>
              <AlertCircleIcon />
              <AlertTitle>Fin de configuration</AlertTitle>
              <AlertDescription>
                <p>Si tu as terminé ta configuration et que tu veux t'en servir comme base pour ton projet</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Définis la méthode de sign in/up que tu préfères (OTP ou password-based)</li>
                  <li>
                    Supprime les routes, les composants, schémas, et les actions qui ne sont plus nécessaires (ex: pas besoin garder forgot/reset-password si tu
                    utilises l'OTP)
                  </li>
                  <li>
                    Tu peux renommer la route{' '}
                    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">/private</code> et les strings qui y
                    font référence pour une route plus personnalisée
                  </li>
                  <li>Tu peux également renommer les routes d'authentification si tu préfères autre chose</li>
                  <li>
                    Pour finir, tu peux supprimer le contenu de la page principal et le dossier{' '}
                    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">/components/tutorial</code>
                  </li>
                </ul>
                <p>Bon dev ;)</p>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Etapes à suivre</h3>
          <ol className="flex flex-col gap-6 my-6 ml-6 ">
            <TutorialStep title="Créer ton projet Supabase">
              <p>
                Rends toi sur{' '}
                <a
                  href="https://app.supabase.com/project/_/settings/api"
                  target="_blank"
                  className="font-bold hover:underline text-foreground/80"
                  rel="noreferrer">
                  database.new
                </a>{' '}
                et créer ton projet Supabase
              </p>
            </TutorialStep>

            <TutorialStep title="Declare tes variables d'environnement">
              <p>
                Renomme le fichier{' '}
                <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                  .env.example
                </span>{' '}
                dans ton dossier en{' '}
                <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                  .env.local
                </span>{' '}
                et copie/colle dans ton fichier les valeurs provenant de{' '}
                <a
                  href="https://app.supabase.com/project/_/settings/api"
                  target="_blank"
                  className="font-bold hover:underline text-foreground/80"
                  rel="noreferrer">
                  API Settings
                </a>{' '}
                et{' '}
                <a
                  href="https://app.supabase.com/project/_/settings/api-keys"
                  target="_blank"
                  className="font-bold hover:underline text-foreground/80"
                  rel="noreferrer">
                  API Keys
                </a>
                .
              </p>
            </TutorialStep>

            <TutorialStep title="Restart ton server de dev Next.js">
              <p>
                Quitte le server Next.js et relance{' '}
                <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                  npm run dev
                </span>
                {" pour charger les nouvelles variables d'environnement."}
              </p>
            </TutorialStep>

            <TutorialStep title="Refresh ta page">
              <p>Refresh ta page pour prendre en compte les nouvelles valeurs.</p>
            </TutorialStep>
          </ol>
        </div>
      </main>
    </div>
  );
}
