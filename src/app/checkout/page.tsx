import CheckoutClient from "@/components/checkout/checkout-client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Finalizar Compra</CardTitle>
          <CardDescription>Confirma tu pedido y realiza el pago.</CardDescription>
        </CardHeader>
        <CheckoutClient />
      </Card>
    </div>
  );
}
