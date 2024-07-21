import Quotes from "@/SVGs/Quotes";
import Image from "next/image";
import React from "react";

export default function Testimonials() {
    return (
        <section className="relative flex flex-col justify-center items-center 2xl:px-60 px-10 font-[arial]">
            <h1 className="text-center text-4xl font-bold text-primary flex items-center flex-col">
                Testimonials
                <div className="md:w-[400px] w-[100px] h-[1px] bg-primary mt-5"></div>
            </h1>
            <div className="flex md:gap-10 lg:flex-row flex-col">
                <div className="bg-[#EDEFEC] mt-20 flex flex-col items-center basis-1/3 rounded-lg pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute w-[100px] h-[100px] object-cover rounded-full border-[10px] border-white -translate-y-1/2"
                    />
                    <p className="relative mt-16 mx-16 text-center leading-relaxed text-[16px]">
                        <Quotes className="inline mr-2 w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline rotate-180 w-[20px] -translate-y-1/3" />
                    </p>
                </div>
                <div className="bg-[#EDEFEC] mt-20 flex flex-col items-center basis-1/3 rounded-lg pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute w-[100px] h-[100px] object-cover rounded-full border-[10px] border-white -translate-y-1/2"
                    />
                    <p className="relative mt-16 mx-16 text-center leading-relaxed text-[16px]">
                        <Quotes className="inline mr-2 w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline rotate-180 w-[20px] -translate-y-1/3" />
                    </p>
                </div>
                <div className="bg-[#EDEFEC] mt-20 flex flex-col items-center basis-1/3 rounded-lg pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute w-[100px] h-[100px] object-cover rounded-full border-[10px] border-white -translate-y-1/2"
                    />
                    <p className="relative mt-16 mx-16 text-center leading-relaxed text-[16px]">
                        <Quotes className="inline mr-2 w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline rotate-180 w-[20px] -translate-y-1/3" />
                    </p>
                </div>
            </div>
        </section>
    );
}
