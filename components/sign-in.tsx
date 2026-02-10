"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                setLoading(false);
                // Redirect or generic success handling is usually automatic or handled by parent
                window.location.reload(); // Simple reload to refresh session state
            },
            onError: (ctx) => {
                setLoading(false);
                setError(ctx.error.message);
            },
        });
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Sign In</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <div className="text-red-400 text-sm">{error}</div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Sign In
                </button>
            </form>
        </div>
    );
}
