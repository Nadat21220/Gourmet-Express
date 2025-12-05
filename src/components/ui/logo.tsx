import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
};
// Este es nuestro logo con los cambios de tamaño.
export function Logo({ className, width = 48, height = 48 }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <Image src="/logo/logocafe.png" alt="Gourmet Express" width={width} height={height} />
    </Link>
  );
}
