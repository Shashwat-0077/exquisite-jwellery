"use client";
import { usePathname } from "next/navigation";
import React from "react";

const hiddenOnPathNames = ["/checkout"];

export default function Footer() {
    const pathName = usePathname();

    return hiddenOnPathNames.includes(pathName) ? (
        <></>
    ) : (
        <section className="min-h-[200px] bg-[#D9D9D9] grid place-content-center">
            Footer
        </section>
    );
}
