import { authClient } from "@/app/lib/auth-client";
import DragDrop from '@/components/DragDrop';
import { Loader2, Sparkles } from 'lucide-react';

interface ImageUploadInputProps {
    onFileSelect: (file: File) => Promise<void>;
    isProcessing: boolean;
}

export default function ImageUploadInput({ onFileSelect, isProcessing }: ImageUploadInputProps) {
    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <div className="w-full h-64 bg-zinc-900/50 border border-zinc-700/50 rounded-xl flex flex-col items-center justify-center gap-4 text-center p-8 border-dashed">
                <div className="p-4 bg-zinc-800/50 rounded-full">
                    <Sparkles className="text-zinc-400" size={24} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-medium text-white">Sign in to Vibe Code</h3>
                    <p className="text-sm text-zinc-400 max-w-xs">
                        You need to be signed in to upload screenshots and generate code.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <DragDrop onFileSelect={onFileSelect} isProcessing={isProcessing} />
            {isProcessing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 z-10">
                    <Loader2 className="animate-spin text-purple-500" size={40} />
                    <p className="font-medium text-zinc-200">Vibe coding pixel perfect layout...</p>
                </div>
            )}
        </>
    );
}
