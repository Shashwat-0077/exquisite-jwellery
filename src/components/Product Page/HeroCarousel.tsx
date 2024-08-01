"use client";

import "swiper/css";
import { navStore } from "@/store/navBarState";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageWithFallback from "../ui/ImageWithFallback";

const IMAGES = ["earrings", "ring", "necklace", "bracelet", "luxe"];

export default function HeroCarousel({
    className,
    images,
}: {
    className?: string;
    images: string[];
}) {
    const { isVisible } = navStore((state) => state);

    // TODO : Implement thumbs init
    return (
        <Swiper
            loop
            slidesPerView={1}
            spaceBetween={30}
            className={`md:!sticky ${
                isVisible ? "md:top-[90px]" : "md:top-[10px]"
            } h-auto w-full max-w-[500px] select-none rounded-lg transition-all duration-200`}
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <ImageWithFallback
                        src={img}
                        alt={img}
                        aspectRatio={1 / 1}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
