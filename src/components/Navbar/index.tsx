"use client";
import { navStore } from "@/store/navBarState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavItemsSheet from "./NavItemsSheet";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import SideCart from "./SideCart";
import Link from "next/link";

export default function Navbar() {
    // TODO : Implement a hook for screen resize
    // TODO : 2 Buttons are using same sheet we can extract the open/close functionality and can use single sheet
    // BUG :  NavItemsSheet remains open if you open it mobile view and switch to desktop view
    // BUG : Jitter in Nav links under line, when the page changes
    const router = useRouter();

    const { isVisible, setIsVisible } = navStore((state) => state);
    const [lastScroll, setLastScroll] = useState(-999);

    const handleNavScroll = () => {
        if (window.scrollY < lastScroll) setIsVisible(true);
        else setIsVisible(false);

        setLastScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNavScroll);

        return () => {
            window.removeEventListener("scroll", handleNavScroll);
        };
    });

    return (
        <nav
            className={`sticky left-0 top-0 z-50 flex items-center justify-between bg-primary px-7 py-2 ${
                !isVisible ? "-translate-y-full" : ""
            } transition-all duration-200`}
        >
            <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:space-x-5">
                <NavItemsSheet />
                <Link className="relative w-[70px] h-[70px]" href={"/"}>
                    <Image
                        fill
                        priority
                        src="/logo.png"
                        alt="logo"
                        className="hover:cursor-pointer object-cover"
                    />
                </Link>
                <SideCart className="md:hidden" />

                <ul className="hidden items-center space-x-5 pt-2 text-white md:flex">
                    <li className="group cursor-pointer">
                        <Link href={"/store?q=earrings"}>
                            <p>Earrings</p>
                            <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                        </Link>
                    </li>
                    <li className="group cursor-pointer">
                        <Link href={"/store?q=rings"}>
                            <p>Rings</p>
                            <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                        </Link>
                    </li>
                    <li className="group cursor-pointer">
                        <Link href={"/store?q=necklace"}>
                            <p>Necklace</p>
                            <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                        </Link>
                    </li>
                    <li className="group cursor-pointer">
                        <Link href={"/store?q=bracelets"}>
                            <p>Bracelets</p>
                            <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                        </Link>
                    </li>
                    <li className="group cursor-pointer">
                        <Link href={"/store?q=luxe"}>
                            <p>Luxe</p>
                            <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="hidden items-center space-x-5 pt-2 text-white md:flex">
                <Heart
                    className="cursor-pointer"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                />
                <Search
                    className="cursor-pointer"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                />
                <SideCart />
                <UserRound
                    onClick={() => {
                        router.push("/login");
                    }}
                    className="cursor-pointer"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                />
            </div>
        </nav>
    );
}
