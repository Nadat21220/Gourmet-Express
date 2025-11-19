"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import {
  aiPoweredOrderAssistance,
  type AIPoweredOrderAssistanceOutput,
} from "@/ai/flows/ai-powered-order-assistance";

export default function AiOrderAssistance() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPoweredOrderAssistanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const currentOrder = cartItems
        .map((item) => `${item.quantity}x ${item.productName} (${item.size})`)
        .join(", ");
        
      // Mocking order history for demonstration purposes
      const orderHistory = "Latte, Croissant, Espresso";

      const response = await aiPoweredOrderAssistance({
        currentOrder,
        orderHistory,
      });

      setResult(response);
    } catch (e) {
      setError("No se pudieron obtener las recomendaciones. Intenta de nuevo.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={getRecommendations}
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Asistente de Pedido IA
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {result && (
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Wand2 className="h-4 w-4 text-primary"/>Sugerencias para ti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {result.recommendations && (
              <div>
                <h4 className="font-semibold">Recomendaciones</h4>
                <p className="text-muted-foreground">{result.recommendations}</p>
              </div>
            )}
            {result.complementaryItems && (
              <div>
                <h4 className="font-semibold">Para acompañar</h4>
                <p className="text-muted-foreground">{result.complementaryItems}</p>
              </div>
            )}
             {result.personalizedPromotions && (
              <div>
                <h4 className="font-semibold">Promociones para ti</h4>
                <p className="text-muted-foreground">{result.personalizedPromotions}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
