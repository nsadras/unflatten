"use client";

import Link from "next/link";

import { useState } from 'react';
import { authClient } from "@/app/lib/auth-client";
import Header from '@/components/Header';
import Preview from '@/components/Preview';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploadInput from '@/components/ImageUploadInput';
import CodeInput from '@/components/CodeInput';

export default function Home() {
  const { data: session } = authClient.useSession();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [inputType, setInputType] = useState<'image' | 'code'>('image');
  const [pastedCode, setPastedCode] = useState('');

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // Start processing
    setIsProcessing(true);

    try {
      // Convert to base64 for API
      const base64Promise = new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(selectedFile);
      });

      const base64Image = await base64Promise;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate code');
      }

      const data = await response.json();
      setGeneratedCode(data.code);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFile(null);
      setPreviewUrl(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setGeneratedCode(null);
    setError(null);
    setPastedCode('');
  };

  const handlePasteSubmit = () => {
    if (!pastedCode.trim()) return;
    setGeneratedCode(pastedCode);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <Header
          showReset={!!generatedCode}
          onReset={handleReset}
        />

        {/* content */}
        <div className="flex-1 flex flex-col items-center pt-20 pb-20 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!generatedCode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key="upload"
                className="w-full max-w-xl flex flex-col gap-8 text-center"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold bg-clip-text text-white">
                    Turn Screenshots into Figma Designs
                  </h2>
                  <div className="text-zinc-400 text-base max-w-md mx-auto space-y-1">
                    <p>1. Upload a screenshot or paste React code.</p>
                    <p>2. Save the generated bridge JSON.</p>
                    <p>3. Import JSON to Figma using our <Link href="/install" className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30">Plugin</Link>.</p>
                  </div>
                </div>

                {/* Input Toggle */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setInputType('image')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${inputType === 'image' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Upload Image
                  </button>
                  <button
                    onClick={() => setInputType('code')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${inputType === 'code' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Paste Code
                  </button>
                </div>

                <div className="relative min-h-[300px]">
                  {inputType === 'image' ? (
                    <ImageUploadInput
                      onFileSelect={handleFileSelect}
                      isProcessing={isProcessing}
                    />
                  ) : (
                    <CodeInput
                      value={pastedCode}
                      onChange={setPastedCode}
                      onSubmit={handlePasteSubmit}
                    />
                  )}
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key="preview"
                className="w-full h-full"
              >
                <Preview code={generatedCode} originalImage={previewUrl!} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
