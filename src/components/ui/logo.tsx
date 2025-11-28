import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function Logo({ className, width = 100, height = 25 }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <Image src="/logo/logocafe.png" alt="Gourmet Express" width={width} height={height} />
    </Link>
  );
}
