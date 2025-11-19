'use server';

/**
 * @fileOverview An AI-powered order assistance flow that provides intelligent recommendations, suggests complementary items, and highlights personalized promotions.
 *
 * - aiPoweredOrderAssistance - A function that handles the AI-powered order assistance process.
 * - AIPoweredOrderAssistanceInput - The input type for the aiPoweredOrderAssistance function.
 * - AIPoweredOrderAssistanceOutput - The return type for the aiPoweredOrderAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredOrderAssistanceInputSchema = z.object({
  orderHistory: z.string().describe('The user order history.'),
  currentOrder: z.string().describe('The current order items.'),
});
export type AIPoweredOrderAssistanceInput = z.infer<typeof AIPoweredOrderAssistanceInputSchema>;

const AIPoweredOrderAssistanceOutputSchema = z.object({
  recommendations: z.string().describe('AI-powered recommendations based on order history.'),
  complementaryItems: z.string().describe('Suggested complementary items for the current order.'),
  personalizedPromotions: z.string().describe('Personalized promotions based on order patterns.'),
});
export type AIPoweredOrderAssistanceOutput = z.infer<typeof AIPoweredOrderAssistanceOutputSchema>;

export async function aiPoweredOrderAssistance(input: AIPoweredOrderAssistanceInput): Promise<AIPoweredOrderAssistanceOutput> {
  return aiPoweredOrderAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredOrderAssistancePrompt',
  input: {schema: AIPoweredOrderAssistanceInputSchema},
  output: {schema: AIPoweredOrderAssistanceOutputSchema},
  prompt: `You are an AI assistant designed to provide intelligent recommendations, suggest complementary items, and highlight personalized promotions based on a user's order history and current order.

  Order History: {{{orderHistory}}}
  Current Order: {{{currentOrder}}}

  Based on this information, provide:
  - Recommendations: Suggest new items based on past preferences.
  - Complementary Items: Suggest items that go well with the current order.
  - Personalized Promotions: Highlight any relevant promotions for the user.
  `,
});

const aiPoweredOrderAssistanceFlow = ai.defineFlow(
  {
    name: 'aiPoweredOrderAssistanceFlow',
    inputSchema: AIPoweredOrderAssistanceInputSchema,
    outputSchema: AIPoweredOrderAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
