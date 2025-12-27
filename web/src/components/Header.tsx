import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <span className="font-serif font-bold text-lg tracking-tight">Selene</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link href="/posts" className="hover:text-foreground transition-colors">Essays</Link>
                </nav>
            </div>
        </header>
    );
}
