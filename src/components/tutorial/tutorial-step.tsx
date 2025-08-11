import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function TutorialStep({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <li className="relative">
      <div className="flex items-center gap-3">
        <Checkbox id={title} name={title} className={`peer`} />
        <Label htmlFor={title} className={`relative text-base text-foreground peer-checked:line-through font-medium`}>
          {title}
        </Label>
      </div>
      <div className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}>{children}</div>
    </li>
  );
}
