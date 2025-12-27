export function Footer() {
    return (
        <footer className="w-full border-t border-border py-12 mt-20">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-serif text-lg font-bold text-foreground">Selene</p>
                    <p className="text-sm text-muted mt-2">
                        © {new Date().getFullYear()} Selene. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted">
                    <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                    <a href="#" className="hover:text-accent transition-colors">RSS</a>
                    <a href="#" className="hover:text-accent transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}
