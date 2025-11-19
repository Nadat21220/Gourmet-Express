"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "../ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
      login();
      router.push('/');
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Logo className="mb-4 justify-center" />
        <CardTitle className="font-headline text-2xl">Crea tu cuenta</CardTitle>
        <CardDescription>
          Completa el formulario para empezar a ordenar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input id="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@email.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Número de teléfono</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar contraseña</Label>
          <Input id="confirm-password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleRegister}>Crear Cuenta</Button>
        <div className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
                Inicia Sesión
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
