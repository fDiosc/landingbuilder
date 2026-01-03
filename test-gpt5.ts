import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local manually
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const LandingSchema = z.object({
    theme: z.object({
        primaryColor: z.string(),
        backgroundColor: z.string(),
    }).strict(),
    hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        cta: z.string(),
    }).strict(),
    logoCloud: z.object({
        isActive: z.boolean().describe("Set to true if you want to include a logo cloud"),
        title: z.string(),
    }).strict(),
    leadForm: z.object({
        placeholder: z.string(),
        buttonText: z.string(),
    }).strict(),
    featureCards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.enum(["zap", "shield", "rocket", "heart", "star", "sparkles"]),
    }).strict()),
    pricing: z.object({
        isActive: z.boolean().describe("Set to true if you want to include pricing"),
        title: z.string(),
        plans: z.array(z.object({
            name: z.string(),
            price: z.string(),
            description: z.string(),
            features: z.array(z.string()),
            buttonText: z.string(),
            popular: z.boolean(),
        }).strict()),
    }).strict(),
    faq: z.object({
        isActive: z.boolean().describe("Set to true if you want to include FAQs"),
        title: z.string(),
        items: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        }).strict()),
    }).strict(),
    calCom: z.object({
        isActive: z.boolean().describe("Set to true if you want to include a cal.com link"),
        title: z.string(),
        subtitle: z.string(),
        calLink: z.string(),
    }).strict(),
}).strict();

async function testGPT5() {
    const apiKey = process.env.OPENAI_API_KEY;
    const modelName = process.env.AI_MODEL || 'gpt-5.2';

    console.log(`Testing model: ${modelName}`);

    if (!apiKey) {
        console.error("Missing OPENAI_API_KEY");
        return;
    }

    const openai = createOpenAI({ apiKey });
    const model = openai(modelName);

    try {
        console.log("Sending request to AI...");
        const { object } = await generateObject({
            model,
            schema: LandingSchema,
            prompt: "Generate a landing page for a coffee shop called 'Brew & Byte'. Determine which sections are needed and set their isActive flag accordingly.",
        });

        console.log("SUCCESS! Result:");
        console.log(JSON.stringify(object, null, 2));
    } catch (error: any) {
        console.error("FAILED with error:");
        console.error(error.message);
        if (error.responseBody) {
            console.log("Response Body:", error.responseBody);
        }
    }
}

testGPT5();
