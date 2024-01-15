"use client"

import * as React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import * as z from "zod"
import { useAuth } from "@/app/(contexts)/AuthenticationContext"
import AuthenticationService from "@/app/(services)/AuthenticationService"

const formSchema = z.object({
    email: z.string().min(2).max(50).email("Invalid email address"),
    password: z.string().min(2).max(50)
})

interface SignupFormFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SignupForm({className, ...props}: SignupFormFormProps) {
    const {login} = useAuth();

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


       const data =  await AuthenticationService().signup({email: values.email, password: values.password});
       console.log(data)
       await login(values.email, values.password)
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={"password"} autoComplete={"current-password"}
                                       placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Shhhh, don&apos;t tell anyone. It&apos;s a secret. 🤫
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