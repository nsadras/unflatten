import { model } from '@/lib/gemini';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an expert Frontend Developer specializing in Tailwind CSS and React.
Your goal is to "Vibe Code" a screenshot into pixel-perfect React code.

RULES:
1. Use ONLY Tailwind CSS for styling. No external CSS files.
2. Use Lucide React for icons if needed (import { ... } from 'lucide-react').
3. The output must be a single functional React component.
4. Do not omit any details. Replicate spacing, font sizes, and colors exactly.
5. Use a dark theme by default if ambiguous, but follow the screenshot.
6. Return a JSON object with a single field "code" containing the raw component code.
7. Do not wrap the code in markdown blocks (no \`\`\`tsx).
8. The component should NOT have a default export, just 'export function Component() ...'.
`;

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Gemini expects the base64 part without the data:image/png;base64 prefix
        const base64Data = image.split(',')[1];

        // Check mime type (defaulting to png if not found, but it should be there)
        const mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/png';

        const result = await model.generateContent([
            SYSTEM_PROMPT,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType
                }
            },
            "Recreate this UI using React and Tailwind CSS."
        ]);

        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if Gemini returns them despite instructions
        text = text.replace(/```json/g, '').replace(/```/g, '');

        const json = JSON.parse(text);

        return NextResponse.json(json);
    } catch (error) {
        console.error('Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate code', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
