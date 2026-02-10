import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import UserProfile from '@/components/user-profile';

interface HeaderProps {
    showReset?: boolean;
    onReset?: () => void;
}

export default function Header({ showReset = false, onReset }: HeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">Unflatten</h1>
                    <p className="text-zinc-500 text-sm">Screenshot to Figma (SLC)</p>
                </div>
            </Link>

            <div className="flex items-center gap-4">
                {showReset && onReset && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                        <ArrowLeft size={16} /> Start Over
                    </button>
                )}
                <UserProfile />
            </div>
        </header>
    );
}
