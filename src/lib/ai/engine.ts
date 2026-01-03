import { generateObject } from 'ai';
import { z } from 'zod';
import { getAIProvider } from './config';

// Define the schema of what the AI should output (mappings to Craft.js components)
const LandingSchema = z.object({
    theme: z.object({
        primaryColor: z.string().describe("Hex color for primary actions, e.g., #6366f1"),
        backgroundColor: z.string().describe("Hex color for the page background, e.g., #ffffff or #f9fafb"),
    }).strict(),
    header: z.object({
        brandName: z.string(),
        ctaText: z.string(),
        links: z.array(z.object({
            label: z.string(),
            href: z.string(),
        })).describe("3 logical nav links, e.g., Features, Pricing, About"),
    }).strict(),
    footer: z.object({
        brandName: z.string(),
    }).strict(),
    hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        cta: z.string(),
    }).strict(),
    logoCloud: z.object({
        isActive: z.boolean().describe("Set to true if business has partnerships or clients"),
        title: z.string(),
        logos: z.array(z.string()).describe("6 names of famous companies or relevant partners"),
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
        isActive: z.boolean().describe("Set to true for productized SaaS or services"),
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
        isActive: z.boolean().describe("Set to true to answer common user questions"),
        title: z.string(),
        items: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        }).strict()),
    }).strict(),
    calCom: z.object({
        isActive: z.boolean().describe("Set to true for high-touch services or demos"),
        title: z.string(),
        subtitle: z.string(),
        calLink: z.string().describe("A guess for a cal.com link, e.g. company/demo"),
    }).strict(),
}).strict();

export async function generateLandingContent(prompt: string) {
    const model = getAIProvider();

    const { object } = await generateObject({
        model,
        schema: LandingSchema,
        prompt: `
            You are a world-class landing page copywriter and high-end conversion designer.
            Your goal is to generate extremely high-quality content for a landing page that feels like it was designed by a top Silicon Valley agency (like Vercel, Linear, or Framer).

            Project Description: "${prompt}"
            
            Guidelines:
            1. **THEME**: Choose a Primary Color that fits the brand. Background should usually be white (#ffffff) or ultra-light grey (#f9fafb).
            2. **STRUCTURE**: Always include a **HEADER** and **FOOTER**. Choose a cool brand name.
            3. **NAVIGATION**: For header links, always use standard English anchor links: \`#features\`, \`#pricing\`, \`#faq\`, \`#contact\`. The labels can be in the user's language.
            4. **HERO**: Punchy, bold Value Proposition.
            5. **LOGO CLOUD**: Set \`isActive: true\` if the project description implies established trust or partnerships.
            6. **FEATURE CARDS**: Create 3 benefit-driven cards. Choose logical icons (zap for speed, shield for security, rocket for growth, sparkles for AI).
            7. **PRICING**: Set \`isActive: true\` for products or services. Use logical prices like $29, $49, $99.
            8. **FAQ**: Set \`isActive: true\` to address obvious objections.
            9. **CAL.COM**: Set \`isActive: true\` if personalized booking/demo adds value.
            10. **TONE**: Professional, high-end Silicon Valley agency style.

            Note: You are using the latest GPT-5.2 engine. Leverage your advanced reasoning to make the best architectural and design decisions for this specific business.

            Be creative with the copy! Don't just repeat the prompt back. Expand on the idea and make it sound like a billion-dollar company.
        `,
    });

    return object;
}
