import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function Hero() {
    return (
        <>
            {/* 
                //NOTE: Navbar height is approx 80px 
            */}
            <section className='min-h-[calc(100svh-80px)] !bg-cover !bg-center [background:linear-gradient(rgba(255,255,255,0.5),_rgba(255,255,255,0.5)),_url("/hero-bg.jpg")] flex flex-col justify-start items-center pt-10'>
                <Image
                    src="/hero-logo.png"
                    width={200}
                    height={200}
                    alt="LOGO"
                />
                <h1 className="text-[40px] font-black text-primary text-center">
                    Exquisite Jewellery
                </h1>
                <h2 className="text-[40px] font-bold text-primary text-center mt-20">
                    Where Luxury Meets <br />
                    Perfection
                </h2>
                <p className="text-center text-[20px] mt-4">
                    Anti tarnish | Hypoallergenic | 18K Gold <br /> plated |
                    Waterproof
                </p>
                <Button className="rounded-full bg-primary text-[30px] py-7 px-12 mt-16">
                    Get Started
                </Button>
            </section>
        </>
    );
}
