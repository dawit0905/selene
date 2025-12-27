import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CustomImage } from "@/components/mdx/CustomImage";

const components = {
    img: CustomImage,
};

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return {
        title: `${post.meta.title} | Selene`,
        description: post.meta.excerpt,
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
        <article className="max-w-3xl mx-auto px-6 py-20">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted mb-8 hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <header className="mb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight text-foreground">
                    {post.meta.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm text-muted font-sans">
                    <time dateTime={post.meta.date}>{post.meta.date}</time>
                    {post.meta.tags && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {post.meta.tags.map((tag: string) => (
                                    <span key={tag} className="bg-muted/10 px-2 py-0.5 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-serif mx-auto prose-headings:font-serif prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                <MDXRemote source={post.content} components={components} />
            </div>

            <div className="mt-20 pt-10 border-t border-border">
                {/* Newsletter Signup Placeholder */}
                <div className="bg-muted/5 p-8 rounded-xl text-center">
                    <h3 className="font-serif text-xl font-bold mb-2">Subscribe to Selene</h3>
                    <p className="text-muted mb-6">Receive essays on literature and reality in your inbox.</p>
                    <button className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity">
                        Subscribe via Email
                    </button>
                </div>
            </div>
        </article>
    );
}
