import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[375px]">{children}</Card>
    </div>
  );
}
