import Link from "next/link";
import { Download, FolderOpen, Terminal, CheckCircle } from "lucide-react";
import Header from '@/components/Header';

export default function InstallPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">

                <Header />

                <div className="max-w-3xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Install the Unflatten Plugin
                        </h1>
                        <p className="mt-4 text-xl text-zinc-400">
                            Follow these steps to install the Unflatten plugin for Figma (Alpha).
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 shadow-xl overflow-hidden sm:rounded-xl">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-12">

                                {/* Step 1: Download */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                            <Download className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-white">Step 1: Download the Plugin</h3>
                                        <div className="mt-2 max-w-xl text-sm text-zinc-400">
                                            <p>Download the latest version of the plugin as a generic zip file. This is safe for testing.</p>
                                        </div>
                                        <div className="mt-4">
                                            <a
                                                href="/unflatten-plugin.zip"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                            >
                                                Download Plugin ZIP
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Unzip */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">
                                            <FolderOpen className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-white">Step 2: Unzip the Archive</h3>
                                        <div className="mt-2 max-w-xl text-sm text-zinc-400">
                                            <p>Locate the downloaded <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">unflatten-plugin.zip</code> file and unzip it. You should see a folder containing <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">manifest.json</code> and other files.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Enable Developer Mode */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">
                                            <Terminal className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-white">Step 3: Import into Figma</h3>
                                        <div className="mt-2 max-w-xl text-sm text-zinc-400">
                                            <ol className="list-decimal list-inside space-y-1 marker:text-zinc-500">
                                                <li>Open the Figma Desktop App.</li>
                                                <li>Create a new design file.</li>
                                                <li>Go to <strong className="text-zinc-300">Plugins</strong> &gt; <strong className="text-zinc-300">Development</strong> &gt; <strong className="text-zinc-300">Import plugin from manifest...</strong></li>
                                                <li>Navigate to the unzipped folder and select the <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">manifest.json</code> file.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Run */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">
                                            <CheckCircle className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-white">Step 4: Run the Plugin</h3>
                                        <div className="mt-2 max-w-xl text-sm text-zinc-400">
                                            <p>The plugin is now installed! You can run it by searching for &quot;Unflatten Paster&quot; in your plugins list or by pressing <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">Cmd+/</code> and typing the name.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
