"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Shield, MapPin, Mail, ExternalLink, LogOut } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for Netlify Identity user
        const checkUser = () => {
            // @ts-ignore
            if (window.netlifyIdentity) {
                // @ts-ignore
                const currentUser = window.netlifyIdentity.currentUser();
                setUser(currentUser);
                setLoading(false);
            } else {
                // Retry if script not loaded yet
                setTimeout(checkUser, 300);
            }
        };

        checkUser();
    }, []);

    if (loading) {
        return (
            <main className="max-w-3xl mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted/20 rounded-full"></div>
                    <div className="h-4 w-32 bg-muted/20 rounded"></div>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="max-w-3xl mx-auto px-6 py-20 min-h-screen text-center">
                <h1 className="text-3xl font-bold font-serif mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-8">Please log in to view your profile.</p>
                <Link href="/" className="text-accent hover:underline">Return to Home</Link>
            </main>
        );
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
            <header className="mb-12 border-b border-border pb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">My Profile</h1>
                <p className="text-muted-foreground">Manage your account and settings.</p>
            </header>

            <div className="grid gap-8 md:grid-cols-[1fr_200px]">
                <div className="space-y-8">
                    {/* User Info Card */}
                    <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                <User className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold font-serif mb-1">
                                    {user.user_metadata?.full_name || "User"}
                                </h2>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {user.email}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {user.app_metadata?.roles?.map((role: string) => (
                                        <span key={role} className="inline-flex items-center gap-1 bg-muted/20 text-muted-foreground text-xs px-2.5 py-1 rounded-full font-medium">
                                            <Shield className="w-3 h-3" />
                                            {role}
                                        </span>
                                    )) || (
                                            <span className="inline-flex items-center gap-1 bg-muted/20 text-muted-foreground text-xs px-2.5 py-1 rounded-full font-medium">
                                                <User className="w-3 h-3" />
                                                Member
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Details */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold font-serif border-l-4 border-accent pl-3">Account Details</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="bg-muted/5 p-4 rounded-lg">
                                <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                    <Mail className="w-3 h-3" /> Email
                                </span>
                                <span className="font-medium text-foreground">{user.email}</span>
                            </div>
                            <div className="bg-muted/5 p-4 rounded-lg">
                                <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                    <MapPin className="w-3 h-3" /> Provider
                                </span>
                                <span className="font-medium text-foreground capitalize">{user.app_metadata?.provider || "Email"}</span>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="space-y-4 pt-4">
                        <h3 className="text-lg font-bold font-serif border-l-4 border-accent pl-3">Actions</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/admin/"
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Go to CMS Admin
                            </Link>
                            <button
                                onClick={() => {
                                    // @ts-ignore
                                    if (window.netlifyIdentity) { window.netlifyIdentity.logout(); window.location.href = "/"; }
                                }}
                                className="inline-flex items-center justify-center gap-2 border border-border bg-transparent text-foreground px-6 py-3 rounded-md font-medium hover:bg-muted/20 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
