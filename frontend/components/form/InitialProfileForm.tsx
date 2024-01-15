"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {message: "More letters people"}),
  gender: z
    .string({
      required_error: "Please select an option to display.",
    }),
  imageSource: z
    .string(),
  profession: z
    .string()
    .max(30, {
      message: "Profession must not be longer than 30 characters.",
    })
    .nullable(),
  looking_for: z
    .string({
      required_error: "Please select an option to display.",
    }),
  bio: z.string().max(160),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  // TODO(pleb): fetch data here
  name: "",
  gender: "type-1",
  imageSource: "https://i.pinimg.com/736x/69/00/95/690095e35a8fc72b2b597af61900dd1f.jpg",
  profession: "",
  bio: "",
  looking_for: "type-1"
}

const InitalProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    console.log("data btw: ", data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Based 64 : https://www.kirandev.com/image-upload-in-nextjs-with-base64-encoding*/}
        <FormField
          control={form.control}
          name="imageSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <img src={field.value}/>
              </FormControl>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="What's your name" {...field} />
              </FormControl>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preffered Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="type-1">She/Her</SelectItem>
                  <SelectItem value="type-2">He/Him</SelectItem>
                  <SelectItem value="type-3">They/Them</SelectItem>
                  <SelectItem value="type-4">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input placeholder="What do you do?" {...field} />
              </FormControl>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="looking_for"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Looking for</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="type-1">Not sure yet</SelectItem>
                  <SelectItem value="type-2">Serious reltionship</SelectItem>
                  <SelectItem value="type-3">Just Friends</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create profile</Button>
      </form>
    </Form>
  )
}

export default InitalProfileForm