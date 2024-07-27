import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QuantityCounter from "../ui/QuantityCounter";

export default function SideCart({
    className,
    open,
    handleOpen,
}: {
    className?: string;
    open: boolean;
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();

    return (
        <Sheet open={open} onOpenChange={handleOpen}>
            <SheetContent className="flex w-[300px] max-w-[auto] flex-col justify-between p-0 text-black sm:w-[450px] sm:max-w-[auto]">
                <div className="p-6">
                    <SheetHeader>
                        <SheetTitle className="text-left text-2xl">
                            Shopping Cart
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className={"flex gap-5"}>
                        <div className="relative h-[full] w-[80px]">
                            <Image
                                src={"/ring.jpg"}
                                fill
                                alt="image"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="font-bold">Product Name</h1>
                            <p>&#8377; 200</p>
                            <QuantityCounter className="mt-2" />
                        </div>
                    </div>
                </div>
                <SheetFooter className="w-full p-6 pt-0 [box-shadow:rgba(0,_0,_0,_0.35)_0px_5px_15px]">
                    <div className="w-full">
                        <div className="flex justify-between px-2 py-6">
                            <p className="text-xl font-bold">Subtotal</p>
                            <p className="text-xl font-bold">&#8377;200</p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-full py-6">Check out</Button>
                            <Button
                                className="w-full py-6"
                                onClick={() => {
                                    router.push("/cart");
                                }}
                            >
                                View Cart
                            </Button>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
