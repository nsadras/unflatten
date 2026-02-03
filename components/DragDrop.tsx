"use client";

import { useState, useCallback } from 'react';
import { Upload, FileUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface DragDropProps {
    onFileSelect: (file: File) => void;
    isProcessing: boolean;
}

export default function DragDrop({ onFileSelect, isProcessing }: DragDropProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    }, [onFileSelect]);

    return (
        <motion.div
            layout
            className={`relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer
        ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'}
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileInput}
            />

            <div className="flex flex-col items-center gap-4 text-zinc-400">
                <div className={`p-4 rounded-full bg-zinc-800 ${isDragging ? 'text-blue-400' : ''}`}>
                    {isDragging ? <FileUp size={32} /> : <Upload size={32} />}
                </div>
                <div className="text-center">
                    <p className="text-lg font-medium text-zinc-200">
                        {isDragging ? 'Drop it here!' : 'Click or drag screenshot'}
                    </p>
                    <p className="text-sm mt-1">PNG, JPG up to 10MB</p>
                </div>
            </div>
        </motion.div>
    );
}
