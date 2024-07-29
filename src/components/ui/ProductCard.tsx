"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LikeButton from "@/components/ui/AnimatedLikeButton";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useRouter } from "next/navigation";

type ProductParams = {
    title: string;
    price: number;
    imgSrc: string;
    className?: string;
};

export default function ProductCard({
    title,
    price,
    imgSrc,
    className,
}: ProductParams) {
    const router = useRouter();

    return (
        <Card
            className={cn(
                `overflow-hidden rounded-none border-0 shadow-none`,
                className,
            )}
        >
            <CardHeader className="p-0">
                <ImageWithFallback
                    onClick={() => {
                        // FIXME : fis this so that it uses real ids rather than "something"
                        router.push("/products/something");
                    }}
                    src={imgSrc}
                    alt={imgSrc}
                    aspectRatio={1 / 1.2}
                    className="overflow-hidden hover:cursor-pointer"
                />
            </CardHeader>
            <CardContent className="mt-3 flex items-start justify-between p-0">
                <div className="flex flex-col items-start justify-between">
                    <CardTitle className="text-xl capitalize">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-md">
                        &#8377;{price}
                    </CardDescription>
                </div>
                <div className="flex gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <LikeButton
                                    width={25}
                                    height={25}
                                    parentOnclick={() => {
                                        console.log("hello");
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to wishlist</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <ShoppingCart />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to Cart</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
}
