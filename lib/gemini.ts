import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
    console.warn('Missing GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

// Export the model instance we want to use
export const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
