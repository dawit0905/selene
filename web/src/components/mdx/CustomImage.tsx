import NextImage from "next/image";

export function CustomImage({ src, alt, width, height, ...props }: React.ComponentProps<"img">) {
    return (
        <div className="my-8">
            <NextImage
                src={src || ""}
                alt={alt || ""}
                width={width ? parseInt(width as string) : 800}
                height={height ? parseInt(height as string) : 450}
                className="rounded-lg shadow-sm"
                {...props}
            />
            {alt && <p className="text-center text-sm text-muted mt-2">{alt}</p>}
        </div>
    );
}
