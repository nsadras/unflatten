"use client";

import { useState } from 'react';
import DragDrop from '@/components/DragDrop';
import Preview from '@/components/Preview';
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
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
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Unflatten</h1>
              <p className="text-zinc-500 text-sm">Screenshot to Figma (SLC)</p>
            </div>
          </div>
          {generatedCode && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Start Over
            </button>
          )}
        </header>

        {/* content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
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
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    Vibe Code your Design
                  </h2>
                  <p className="text-zinc-400">
                    Upload a mobile screenshot or paste React code.
                  </p>
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

                <div className="relative">
                  {inputType === 'image' ? (
                    <>
                      <DragDrop onFileSelect={handleFileSelect} isProcessing={isProcessing} />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 z-10">
                          <Loader2 className="animate-spin text-purple-500" size={40} />
                          <p className="font-medium text-zinc-200">Vibe coding pixel perfect layout...</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <textarea
                        value={pastedCode}
                        onChange={(e) => setPastedCode(e.target.value)}
                        placeholder="Paste your React component code here..."
                        className="w-full h-64 bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
                      />
                      <button
                        onClick={handlePasteSubmit}
                        disabled={!pastedCode.trim()}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 disabled:opacity-50 transition-opacity"
                      >
                        Visualize & Export to Figma
                      </button>
                    </div>
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
