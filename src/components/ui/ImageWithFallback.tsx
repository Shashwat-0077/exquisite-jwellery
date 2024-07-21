"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

const ImageWithFallback: React.FC<{
    src: string;
    alt: string;
    aspectRatio?: number;
    className?: string;
}> = ({ src, alt, aspectRatio, className }) => {
    const [loading, setLoading] = useState(true);

    return (
        <AspectRatio
            className={cn("relative w-full", className)}
            ratio={aspectRatio}
        >
            {loading && <Skeleton className="h-full w-full" />}
            <Image
                fill
                src={src}
                alt={alt}
                onLoad={() => setLoading(false)}
                className={`transition-opacity ${
                    loading ? "opacity-0" : "opacity-100"
                } object-cover object-center`}
            />
        </AspectRatio>
    );
};

export default ImageWithFallback;
