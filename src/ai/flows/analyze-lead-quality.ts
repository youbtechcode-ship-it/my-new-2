'use server';

/**
 * @fileOverview AI flow to analyze the quality of leads from freelancer and brand submissions.
 *
 * - analyzeLeadQuality - Analyzes lead quality and returns a score.
 * - AnalyzeLeadQualityInput - The input type for the analyzeLeadQuality function.
 * - AnalyzeLeadQualityOutput - The return type for the analyzeLeadQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLeadQualityInputSchema = z.object({
  leadData: z.string().describe('The data of the lead to analyze.'),
  leadType: z.enum(['freelancer', 'brand']).describe('The type of lead (freelancer or brand).'),
});
export type AnalyzeLeadQualityInput = z.infer<typeof AnalyzeLeadQualityInputSchema>;

const AnalyzeLeadQualityOutputSchema = z.object({
  leadScore: z
    .number()
    .describe(
      'A score from 0 to 1 indicating the likelihood of the lead converting, with 1 being the highest likelihood.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the lead score, explaining the factors that influenced the score.'),
});
export type AnalyzeLeadQualityOutput = z.infer<typeof AnalyzeLeadQualityOutputSchema>;

export async function analyzeLeadQuality(input: AnalyzeLeadQualityInput): Promise<AnalyzeLeadQualityOutput> {
  return analyzeLeadQualityFlow(input);
}

const analyzeLeadQualityPrompt = ai.definePrompt({
  name: 'analyzeLeadQualityPrompt',
  input: {schema: AnalyzeLeadQualityInputSchema},
  output: {schema: AnalyzeLeadQualityOutputSchema},
  prompt: `You are an expert lead quality analyzer for a digital creator platform.

You will receive lead data from freelancer and brand submissions, and your task is to assess the likelihood of the lead converting into a successful collaboration or engagement.

Based on the lead data and its type, provide a lead score between 0 and 1 (inclusive), where 1 represents the highest likelihood of conversion.
Also, provide a reasoning for the assigned lead score, explaining the factors that influenced your assessment.

Lead Type: {{{leadType}}}
Lead Data: {{{leadData}}}

Consider factors such as completeness of information, relevance to the platform, expressed interest, and any other relevant indicators.

Format your response as a JSON object with "leadScore" (number between 0 and 1) and "reasoning" (string) fields.
`,
});

const analyzeLeadQualityFlow = ai.defineFlow(
  {
    name: 'analyzeLeadQualityFlow',
    inputSchema: AnalyzeLeadQualityInputSchema,
    outputSchema: AnalyzeLeadQualityOutputSchema,
  },
  async input => {
    const {output} = await analyzeLeadQualityPrompt(input);
    return output!;
  }
);
