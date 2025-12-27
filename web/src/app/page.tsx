import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-accent font-serif">Selene</h1>
        <p className="text-xl text-muted italic font-serif">Christian Realism, Literature & Social Analysis</p>
      </header>

      <section className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h2 className="text-2xl font-bold font-serif group-hover:text-accent transition-colors">
                  {post.meta.title}
                </h2>
                <time className="text-sm text-muted shrink-0 font-sans mt-1 md:mt-0">{post.meta.date}</time>
              </div>
              <p className="text-muted-foreground leading-relaxed font-serif">
                {post.meta.excerpt}
              </p>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-muted">No posts found.</p>
        )}
      </section>
    </main>
  );
}
