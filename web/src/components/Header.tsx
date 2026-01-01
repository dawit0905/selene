"use client";

import Link from "next/link";
import { BookOpen, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
    const [user, setUser] = useState<any>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        // Netlify Identity 위젯 초기화 및 상태 감지
        const initIdentity = () => {
            // @ts-ignore
            if (window.netlifyIdentity) {
                // @ts-ignore
                const currentUser = window.netlifyIdentity.currentUser();
                setUser(currentUser);

                // @ts-ignore
                window.netlifyIdentity.on("login", (user) => {
                    setUser(user);
                    // @ts-ignore
                    window.netlifyIdentity.close();
                });

                // @ts-ignore
                window.netlifyIdentity.on("logout", () => {
                    setUser(null);
                    window.location.href = "/";
                });
            }
        };

        // 스크립트 로딩 대기 (최대 3초)
        const checkIdentity = setInterval(() => {
            // @ts-ignore
            if (window.netlifyIdentity) {
                initIdentity();
                clearInterval(checkIdentity);
            }
        }, 300);

        // 3초 후에도 없으면 포기 (타임아웃)
        const timeout = setTimeout(() => {
            clearInterval(checkIdentity);
        }, 3000);

        return () => {
            clearInterval(checkIdentity);
            clearTimeout(timeout);
        };
    }, []);

    const handleLogin = () => {
        // @ts-ignore
        if (window.netlifyIdentity) {
            // @ts-ignore
            window.netlifyIdentity.open();
        }
    };

    const requestLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        // @ts-ignore
        if (window.netlifyIdentity) {
            // @ts-ignore
            window.netlifyIdentity.logout();
            setShowLogoutConfirm(false);
        }
    };

    return (
        <>
            <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <BookOpen className="w-5 h-5 text-accent" />
                        <span className="font-serif font-bold text-lg tracking-tight">Selene</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                            <Link href="/posts" className="hover:text-foreground transition-colors">Essays</Link>
                        </nav>

                        {/* 로그인 상태 표시 */}
                        <div className="flex items-center gap-3 pl-6 border-l border-border/50">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                                        title="Go to Profile"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="hidden sm:inline-block truncate max-w-[100px]">
                                            {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={requestLogout}
                                        className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                                        title="Log out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-background rounded-xl shadow-xl w-full max-w-sm overflow-hidden border border-border animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-serif mb-2">Sign out?</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Are you sure you want to sign out of your account?
                            </p>
                            <div className="flex items-center gap-3 justify-end">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
