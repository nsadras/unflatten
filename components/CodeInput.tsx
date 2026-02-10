import { Info, ChevronDown } from 'lucide-react';

interface CodeInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function CodeInput({ value, onChange, onSubmit }: CodeInputProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* Guidelines */}
            <details className="group bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden text-left my-4">
                <summary className="flex items-center gap-2 p-3 text-sm font-medium text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors select-none">
                    <div className="bg-zinc-800 p-1 rounded-md">
                        <Info size={14} />
                    </div>
                    <span>Formatting Guidelines</span>
                    <div className="ml-auto transition-transform group-open:rotate-180">
                        <ChevronDown size={14} />
                    </div>
                </summary>
                <div className="p-3 py-3 text-xs text-zinc-500 space-y-2 border-t border-zinc-800/50 mt-1">
                    <p>To ensure the best results, please follow these rules:</p>
                    <ul className="list-disc list-inside space-y-1 ml-1">
                        <li><strong>Structure:</strong> Must export a single <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">default</code> functional component.</li>
                        <li><strong>Styling:</strong> Use pure <strong>Tailwind CSS</strong> classes.</li>
                        <li><strong>Icons:</strong> Import from <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">lucide-react</code> (e.g., <code className="text-zinc-400">import &#123; User &#125; from 'lucide-react'</code>).</li>
                        <li><strong>Images:</strong> Use <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">https://placehold.co/600x400</code> for placeholders.</li>
                        <li><strong>No External Deps:</strong> Do not import other libraries or local files.</li>
                    </ul>
                </div>
            </details>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste your React component code here..."
                className="w-full h-64 bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
                onClick={onSubmit}
                disabled={!value.trim()}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
                Visualize & Export to Figma
            </button>
        </div>
    );
}
