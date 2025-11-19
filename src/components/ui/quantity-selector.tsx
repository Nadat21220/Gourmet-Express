"use client";

import { Button } from "./button";
import { Input } from "./input";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
}

export function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(Math.max(1, quantity - 1));

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10" onClick={decrement}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
            </Button>
            <Input
                type="number"
                className="w-16 h-10 text-center"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
            />
            <Button variant="outline" size="icon" className="h-10 w-10" onClick={increment}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
            </Button>
        </div>
    );
}
