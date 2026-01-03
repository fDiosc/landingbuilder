import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export function getAIProvider() {
    const provider = process.env.AI_PROVIDER || 'google';

    // Check for provider-specific keys first
    const openaiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.AI_API_KEY;

    if (provider === 'openai') {
        if (!openaiKey || openaiKey === 'sua_chave_aqui') {
            throw new Error("OPENAI_API_KEY is missing or invalid");
        }
        const openai = createOpenAI({
            apiKey: openaiKey,
        });
        return openai(process.env.AI_MODEL || 'gpt-5.2');
    }

    if (provider === 'google') {
        if (!googleKey || googleKey === 'sua_chave_aqui') {
            throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing or invalid");
        }
        const google = createGoogleGenerativeAI({
            apiKey: googleKey,
        });
        return google(process.env.AI_MODEL || 'gemini-1.5-flash');
    }

    throw new Error(`Unsupported AI provider: ${provider}`);
}
