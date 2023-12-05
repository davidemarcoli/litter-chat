"use client"

import * as React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import * as z from "zod"
import {signIn} from "next-auth/react";

const formSchema = z.object({
    email: z.string().min(2).max(50).email("Invalid email address"),
    password: z.string().min(2).max(50)
})

interface SignupFormFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SignupForm({className, ...props}: SignupFormFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        setIsLoading(true)

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            console.log(data)
            signIn("credentials", {
                email: values.email,
                password: values.password,
                callbackUrl: "/",
            }).finally(() => {
                setIsLoading(false)
            });
            return data
        }).catch((err) => {
            console.log(err)
            return null
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type={"email"} placeholder="get@some.hoes" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type={"password"} autoComplete={"current-password"}
                                       placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Shhhh, don't tell anyone. It's a secret. 🤫
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}