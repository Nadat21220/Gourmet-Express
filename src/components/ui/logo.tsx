import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CupSoda } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-lg font-bold font-headline text-foreground',
        className
      )}
    >
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <CupSoda className="w-5 h-5" />
      </div>
      <span>Gourmet Express</span>
    </Link>
  );
}
