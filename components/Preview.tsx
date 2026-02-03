"use client";

import { useState, useRef, useEffect } from 'react';
import { Code, Eye, Copy, Check, AlertCircle } from 'lucide-react';
import { generateSandboxHtml } from '@/lib/sandbox';

interface PreviewProps {
    code: string;
    originalImage?: string | null;
}

export default function Preview({ code, originalImage }: PreviewProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleCopyToFigma = async () => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const contentWindow = iframeRef.current.contentWindow as any;

        if (typeof contentWindow.getFigmaData === 'function') {
            try {
                // getFigmaData is now async
                const data = await contentWindow.getFigmaData();
                if (data) {
                    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                    setCopyStatus('copied');
                    setTimeout(() => setCopyStatus('idle'), 2000);
                } else {
                    console.error('No data returned from sandbox');
                    setCopyStatus('error');
                    setTimeout(() => setCopyStatus('idle'), 2000);
                }
            } catch (err) {
                console.error('Error getting figma data:', err);
                setCopyStatus('error');
                setTimeout(() => setCopyStatus('idle'), 2000);
            }
        } else {
            console.error('getFigmaData not found in iframe');
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex items-center justify-between bg-zinc-900 rounded-lg p-1 border border-zinc-800 w-full">
                <div className="flex bg-zinc-900 rounded-lg p-1 gap-1">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-200'}
            `}
                    >
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === 'code' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-200'}
            `}
                    >
                        <Code size={16} /> Code
                    </button>
                </div>

                <button
                    onClick={handleCopyToFigma}
                    className="flex items-center gap-2 px-4 py-2 mr-2 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                    {copyStatus === 'copied' ? <Check size={16} /> : copyStatus === 'error' ? <AlertCircle size={16} /> : <Copy size={16} />}
                    {copyStatus === 'copied' ? 'Copied JSON!' : copyStatus === 'error' ? 'Error' : 'Copy for Figma'}
                </button>
            </div>

            <div className={`flex-1 grid ${originalImage ? 'grid-cols-2' : 'grid-cols-1'} gap-8 h-[600px]`}>
                {/* Original Screenshot (Only if exists) */}
                {originalImage && (
                    <div className="flex flex-col gap-2">
                        <h3 className="text-zinc-400 text-sm font-medium">Original</h3>
                        <div className="relative h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={originalImage} alt="Original" className="object-contain w-full h-full" />
                        </div>
                    </div>
                )}

                {/* Output */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-zinc-400 text-sm font-medium">Result</h3>
                    <div className="relative h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 overflow-hidden">
                        {activeTab === 'code' ? (
                            <div className="p-4 overflow-auto h-full">
                                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                                    {code}
                                </pre>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-white">
                                <iframe
                                    ref={iframeRef}
                                    srcDoc={generateSandboxHtml(code)}
                                    className="w-full h-full border-none"
                                    title="Sandbox"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
