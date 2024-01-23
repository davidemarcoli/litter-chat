"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Image } from '@nextui-org/react'

import { cn } from "@/lib/utils"
import { Button } from '@nextui-org/react'
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
import LookingForCard from "../discovery/LookingForCard"

import "../../components/discovery/ExpansionAnimation.css"
import { Camera, Upload } from 'lucide-react';

const profileFormSchema = z.object({
  imageSource: z
    .string(),
  profession: z
    .string()
    .max(30, {
      message: "Profession must not be longer than 30 characters.",
    }),
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
  imageSource: "https://i.pinimg.com/736x/69/00/95/690095e35a8fc72b2b597af61900dd1f.jpg",
  profession: "",
  bio: "",
  looking_for: "type-1"
}

const uploadPicture = () => {
  console.log("upload")
}

const ProfileForm = () => {
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
    <div className="relative flex flex-col max-h-screen flex-container">
      <div>
        Profile
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {/* Based 64 : https://www.kirandev.com/image-upload-in-nextjs-with-base64-encoding*/}
          <FormField
          control={form.control}
          name="imageSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Camera/>
                Profile Picture
                </FormLabel>
              <FormControl>
                <div className="relative">
                  <Image className="h-[80vh] z-0" src={field.value} />
                  <div className="absolute inset-0 z-1">
                    <div className="absolute top-[75%] left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-white" />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                blah blah blah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='absolute bottom-[15%] left-[5%] z-9'>
          <p className='text-2xl font-bold'>Christina, <i>23</i></p>
          <p className='mt-1 text-xl font-semibold'>She / Her</p>
        </div>

        <Button onClick={uploadPicture} radius='full' size="lg" className={`absolute bottom-[16%] right-[10%] shadow-lg mb-5 className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition`} isIconOnly aria-label="Info" variant="faded">
          <Upload/>
        </Button>
          
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Profession</FormLabel>
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
                <FormLabel className="text-xl">Looking for</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Unknown">Not sure yet</SelectItem>
                    <SelectItem value="Serious">Serious reltionship</SelectItem>
                    <SelectItem value="Casual">Casual Dating</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  <div>
                    <p className="my-2">blah blah blah</p>
                    <LookingForCard type={field.value} />
                  </div>
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
                <FormLabel className="text-xl">Bio</FormLabel>
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

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProfileForm