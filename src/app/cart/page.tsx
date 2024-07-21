import QuantityCounter from "@/components/ui/QuantityCounter";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { data } from "@/dummy/data";
import { CircleHelp } from "lucide-react";
import Image from "next/image";

export default function Cart() {
    // TODO : Add a Dialogue box for the Shipping charges help/QuestionMark button
    // TODO : Disable navbar cart when on the cart page

    return (
        <div className="min-h-[calc(100svh-80px)] md:px-32 mt-20">
            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Product</TableHead>
                        <TableHead className="w-[100px] text-center font-bold hidden md:table-cell">
                            Price
                        </TableHead>
                        <TableHead className="w-[300px] text-center font-bold hidden md:table-cell">
                            Quantity
                        </TableHead>
                        <TableHead className="text-center font-bold ">
                            Total
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 flex-grow-0 max-w-[100px]">
                                        <div className="relative w-[100px] h-[100px] overflow-hidden rounded my-4 ">
                                            <Image
                                                src={"/ring.jpg"}
                                                fill
                                                alt="image"
                                                className="object-cover"
                                            />
                                        </div>
                                        <QuantityCounter className="w-full md:hidden" />
                                    </div>
                                    <h2>{value.title}</h2>
                                </div>
                            </TableCell>
                            <TableCell className="text-center hidden md:table-cell">
                                {value.price}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="grid place-content-center">
                                    <QuantityCounter />
                                </div>
                            </TableCell>
                            <TableCell className="text-center w-[100px]">
                                {1}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between mb-20 flex-col md:flex-row gap-5 px-10 ">
                <div className="basis-1/2">
                    <Textarea
                        className="max-h-[300px] rounded-lg border-gray-400"
                        placeholder="Note to seller"
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="flex justify-between w-full md:gap-52">
                        <p>Cart Total</p>
                        <p>400</p>
                    </div>
                    <div className="flex justify-between w-full md:gap-52">
                        <p className="flex items-center">
                            Shipping Chargers
                            <CircleHelp
                                size={20}
                                color="rgb(156 163 175)"
                                className="ml-2"
                            />
                        </p>
                        <p>200</p>
                    </div>
                    <div className="bg-gray-400 w-full h-[1px]"></div>
                    <div className="flex justify-between w-full md:gap-52">
                        <p>Estimated Total</p>
                        <p>400</p>
                    </div>
                    <div className="flex self-start">
                        <p className="text-[12px]">
                            Coupons can be applied at checkout{" "}
                            <span className="text-red-600 text-[30px] inline-block h-[1px]">
                                *
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
