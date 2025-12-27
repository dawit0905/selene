export const metadata = {
    title: "About | Selene",
    description: "About the purpose and philosophy of Selene.",
};

export default function AboutPage() {
    return (
        <article className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
            <header className="mb-12">
                <h1 className="text-4xl font-bold font-serif mb-6 text-foreground">About Selene</h1>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-serif">
                <p>
                    <strong>Selene</strong> is a digital space dedicated to the intersection of Christian Realism, literature, and social analysis.
                </p>

                <h2>Purpose</h2>
                <p>
                    In an age of rapid information consumption, Selene aims to slow down and reflect on structural realities.
                    Drawing inspiration from the "Christian Realism" tradition, we seek to understand the world not as we wish it to be, but as it is—complex, often contradictory, yet capable of redemption.
                </p>

                <h2>The Aesthetic</h2>
                <p>
                    The design of this platform reflects its content: minimal, focused on typography, and devoid of unnecessary distractions.
                    It is built to honor the act of reading.
                </p>
            </div>
        </article>
    );
}
