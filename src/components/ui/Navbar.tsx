"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import SideCartProductCard from "./SideCartProductCard";
import { navStore } from "@/store/navBarState";

export default function Navbar() {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { isVisible, setIsVisible } = navStore((state) => state);
    const [lastScroll, setLastScroll] = useState(-999);

    const handleNavScroll = () => {
        // if (window.scrollY < 200) return;
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
                {/* 
                    //BUG :  This remains open if you open it mobile view and switch to desktop view 
                */}
                <Sheet>
                    <SheetTrigger>
                        <Menu color="#ffffff" className="md:hidden" />
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className="flex flex-col justify-between"
                    >
                        <div>
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    Navigation
                                </SheetTitle>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <ul className="flex flex-col items-start space-y-2 pt-2 text-black">
                                <li className="group cursor-pointer">
                                    <p>Earrings</p>
                                    <div className="h-[1px] w-0 bg-black transition-all group-hover:w-full"></div>
                                </li>
                                <li className="group cursor-pointer">
                                    <p>Necklace</p>
                                    <div className="h-[1px] w-0 bg-black transition-all group-hover:w-full"></div>
                                </li>
                                <li className="group cursor-pointer">
                                    <p>Rings</p>
                                    <div className="h-[1px] w-0 bg-black transition-all group-hover:w-full"></div>
                                </li>
                                <li className="group cursor-pointer">
                                    <p>Bracelets</p>
                                    <div className="h-[1px] w-0 bg-black transition-all group-hover:w-full"></div>
                                </li>
                                <li className="group cursor-pointer">
                                    <p>Anklet</p>
                                    <div className="h-[1px] w-0 bg-black transition-all group-hover:w-full"></div>
                                </li>
                            </ul>
                        </div>

                        <SheetFooter className="flex !flex-col">
                            <Input type="search" className="border-black" />
                            <div className="!m-0 flex justify-between gap-2 pt-5">
                                <Button className="w-full">
                                    <Heart
                                        className="cursor-pointer"
                                        strokeWidth={1.5}
                                        absoluteStrokeWidth
                                    />
                                </Button>
                                <Button className="w-full">
                                    <UserRound
                                        className="cursor-pointer"
                                        strokeWidth={1.5}
                                        absoluteStrokeWidth
                                    />
                                </Button>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={80}
                    height={80}
                    className="hover:cursor-pointer"
                    priority
                    onClick={() => {
                        router.push("/");
                    }}
                />
                <ShoppingCart
                    className="cursor-pointer md:hidden"
                    strokeWidth={1.5}
                    color="#ffffff"
                    onClick={() => {
                        setIsCartOpen(!isCartOpen);
                    }}
                    absoluteStrokeWidth
                />
                <ul className="hidden items-center space-x-5 pt-2 text-white md:flex">
                    <li className="group cursor-pointer">
                        <p>Earrings</p>
                        <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                    </li>
                    <li className="group cursor-pointer">
                        <p>Necklace</p>
                        <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                    </li>
                    <li className="group cursor-pointer">
                        <p>Rings</p>
                        <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                    </li>
                    <li className="group cursor-pointer">
                        <p>Bracelets</p>
                        <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                    </li>
                    <li className="group cursor-pointer">
                        <p>Anklet</p>
                        <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
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
                <ShoppingCart
                    className="cursor-pointer"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    onClick={() => {
                        setIsCartOpen(!isCartOpen);
                    }}
                />
                <UserRound
                    onClick={() => {
                        router.push("/login");
                    }}
                    className="cursor-pointer"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                />
            </div>
            {/* // TODOD : Export to different component */}

            <Sheet open={isCartOpen}>
                <SheetContent
                    // handleOpenClose={setIsCartOpen}
                    className="flex w-[300px] max-w-[auto] flex-col justify-between p-0 sm:w-[450px] sm:max-w-[auto]"
                >
                    <div className="p-6">
                        <SheetHeader>
                            <SheetTitle className="text-left text-2xl">
                                Shopping Cart
                            </SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        {/* <SideCartProductCard className="mt-5" /> */}
                    </div>
                    <SheetFooter className="w-full p-6 pt-0 [box-shadow:rgba(0,_0,_0,_0.35)_0px_5px_15px]">
                        <div className="w-full">
                            <div className="flex justify-between px-2 py-6">
                                <p className="text-xl font-bold">Subtotal</p>
                                <p className="text-xl font-bold">&#8377;200</p>
                            </div>
                            <div className="flex gap-2">
                                <Button className="w-full py-6">
                                    Check out
                                </Button>
                                <Button
                                    className="w-full py-6"
                                    onClick={() => {
                                        router.push("/cart");
                                        setIsCartOpen(false);
                                    }}
                                >
                                    View Cart
                                </Button>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
