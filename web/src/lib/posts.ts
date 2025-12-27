import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Post {
    slug: string;
    meta: PostMeta;
    content: string;
}

export interface PostMeta {
    title: string;
    date: string;
    excerpt?: string;
    tags?: string[];
    [key: string]: any;
}

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
    const realSlug = decodeURIComponent(slug).replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Normalize date to string
    let dateString = "";
    if (data.date instanceof Date) {
        dateString = data.date.toISOString().split("T")[0];
    } else {
        dateString = data.date ? String(data.date) : new Date().toISOString().split("T")[0];
    }

    // Ensure meta matches the interface
    const meta: PostMeta = {
        ...data,
        title: data.title,
        date: dateString,
    } as PostMeta;

    return {
        slug: realSlug,
        meta,
        content,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // Sort posts by date in descending order
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return posts;
}
