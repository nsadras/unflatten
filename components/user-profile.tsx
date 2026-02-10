"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { User, LogOut } from "lucide-react";

export default function UserProfile() {
    const { data: session, isPending } = authClient.useSession();
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    if (isPending) {
        return <div className="text-zinc-500 text-sm">Loading...</div>;
    }

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                        {session.user.image ? (
                            <img src={session.user.image} alt={session.user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User size={16} />
                        )}
                    </div>
                    <div className="text-sm">
                        <p className="text-white font-medium">{session.user.name}</p>
                        <p className="text-zinc-500 text-xs">{session.user.email}</p>
                    </div>
                </div>
                <button
                    onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                window.location.reload();
                            },
                        }
                    })}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => {
                    setShowSignIn(true);
                    setShowSignUp(false);
                }}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
                Sign In
            </button>
            <button
                onClick={() => {
                    setShowSignUp(true);
                    setShowSignIn(false);
                }}
                className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
                Sign Up
            </button>

            {/* Simple Modal Implementation for Demo */}
            {(showSignIn || showSignUp) && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowSignIn(false);
                                setShowSignUp(false);
                            }}
                            className="absolute -top-12 right-0 text-zinc-400 hover:text-white"
                        >
                            Close
                        </button>
                        {showSignIn && (
                            <div>
                                <SignIn />
                                <p className="text-center mt-4 text-zinc-500 text-sm">
                                    Don't have an account? <button onClick={() => { setShowSignIn(false); setShowSignUp(true); }} className="text-indigo-400 hover:underline">Sign Up</button>
                                </p>
                            </div>
                        )}
                        {showSignUp && (
                            <div>
                                <SignUp />
                                <p className="text-center mt-4 text-zinc-500 text-sm">
                                    Already have an account? <button onClick={() => { setShowSignUp(false); setShowSignIn(true); }} className="text-indigo-400 hover:underline">Sign In</button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
