"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import consola from "consola";

const RegisterSchema = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string({ message: "Email is required" }).email(),
    password: z
        .string({ message: "Password is required" })
        .min(8, { message: "Password Must contain at least 8 Letters" }),
    cnf_password: z
        .string({ message: "Password is required" })
        .min(8, { message: "Password Must contain at least 8 Letters" }),
});

export default function Register() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cnf_password: "",
        },
    });

    function onSubmit(data: z.infer<typeof RegisterSchema>) {
        consola.log(data);
    }

    return (
        <div className="flex min-h-[calc(100svh-80px)] items-center justify-center">
            <div className="flex basis-[400px] flex-col">
                <h1 className="text-center text-4xl">Register</h1>
                <div className="w-full">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex w-full flex-col items-center justify-center space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="flex justify-between">
                                            <FormLabel className="text-black">
                                                Name
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="w-full border-black"
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="flex justify-between">
                                            <FormLabel className="text-black">
                                                email
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="w-full border-black"
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="text-black">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full border-black"
                                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cnf_password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="text-black">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full border-black"
                                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
