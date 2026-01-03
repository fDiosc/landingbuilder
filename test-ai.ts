import { generateText } from 'ai';
import { getAIProvider } from './src/lib/ai/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local manually for the script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testAI() {
    console.log("--- AI TEST SCRIPT ---");
    console.log("Provider:", process.env.AI_PROVIDER || 'google (default)');
    console.log("Desired Model:", process.env.AI_MODEL || 'gpt-5.2 (default)');

    try {
        const model = getAIProvider();
        console.log("Provider instance created successfully.");

        const { text } = await generateText({
            model: model,
            prompt: "Say 'Hello from GPT-5.2' if you are that model, or identify yourself.",
        });

        console.log("\nResponse from AI:");
        console.log("------------------");
        console.log(text);
        console.log("------------------");
        console.log("\nTest PASSED! The model is responding.");
    } catch (error: any) {
        console.error("\nTest FAILED!");
        console.error("Error:", error.message);
        if (error.stack) console.error(error.stack);
    }
}

testAI();
