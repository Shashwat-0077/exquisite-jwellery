"use client";
import { navStore } from "@/store/navBarState";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavItemsSheet from "./NavItemsSheet";
import { Heart, Loader2, Search, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import SideCart from "./SideCart";
import Link from "next/link";
import { useMedia } from "react-use";
import {
    ClerkLoaded,
    ClerkLoading,
    useAuth,
    UserButton,
    useSession,
} from "@clerk/nextjs";

export default function Navbar() {
    const data = useSession();

    //TODO : Make use of auth to chang the use icon
    // TODO : close the sheet when we redirect
    // TODO : Implement a hook for screen resize
    const router = useRouter();
    const user = useAuth();

    const { isVisible, setIsVisible } = navStore((state) => state);
    const [cartOpen, setCartOpen] = useState(false);
    const [lastScroll, setLastScroll] = useState(-999);
    const isMobile = useMedia("(max-width: 768px)", false);

    const handleNavScroll = () => {
        if (window.scrollY < 80) {
            setIsVisible(true);
            return;
        }
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
            {isMobile ? (
                <div className="flex w-full items-center justify-between">
                    <NavItemsSheet />
                    <Link className="relative h-[70px] w-[70px]" href={"/"}>
                        <Image
                            fill
                            priority
                            src="/logo.png"
                            alt="logo"
                            className="object-cover hover:cursor-pointer"
                        />
                    </Link>
                    <ShoppingCart
                        className="cursor-pointer"
                        color="#fff"
                        strokeWidth={1.5}
                        onClick={() => setCartOpen(true)}
                        absoluteStrokeWidth
                    />
                </div>
            ) : (
                <>
                    <div className="flex w-auto justify-start space-x-5">
                        <Link className="relative h-[70px] w-[70px]" href={"/"}>
                            <Image
                                fill
                                priority
                                src="/logo.png"
                                alt="logo"
                                className="object-cover hover:cursor-pointer"
                            />
                        </Link>
                        <ul className="hidden items-center space-x-5 pt-2 text-white md:flex">
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"earrings"%5D`}
                                >
                                    <p>Earrings</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"rings"%5D`}
                                >
                                    <p>Rings</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"necklace"%5D`}
                                >
                                    <p>Necklace</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"bracelets"%5D`}
                                >
                                    <p>Bracelets</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"luxe"%5D`}
                                >
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
                            onClick={() => {
                                router.push("/wishlist");
                            }}
                        />
                        <Search
                            className="cursor-pointer"
                            strokeWidth={1.5}
                            absoluteStrokeWidth
                        />
                        <ShoppingCart
                            className="cursor-pointer"
                            color="#fff"
                            strokeWidth={1.5}
                            absoluteStrokeWidth
                            onClick={() => setCartOpen(true)}
                        />

                        {user.userId ? (
                            <>
                                <ClerkLoaded>
                                    <UserButton />
                                </ClerkLoaded>
                                <ClerkLoading>
                                    <Loader2 className="animate-spin" />
                                </ClerkLoading>
                            </>
                        ) : (
                            <UserRound
                                onClick={() => {
                                    router.push("/sign-in");
                                }}
                                className="cursor-pointer"
                                strokeWidth={1.5}
                                absoluteStrokeWidth
                            />
                        )}
                    </div>
                </>
            )}

            <SideCart open={cartOpen} handleOpen={setCartOpen} />
        </nav>
    );
}
