"use client"
import React from "react";
import Link from "next/link";
import {ModeToggle} from "@/components/theme/mode-toggle";
import { useData } from "@/app/(contexts)/DataContext";

const Navbar = () => {
    const {profile } = useData()
    return (
        <div
            className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
            {/* LEFT LINKS */}
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/chat">Chat</Link>

            </div>
            {/* LOGO */}
            <div className="text-xl md:font-bold flex-1 md:text-center">
                <Link href="/">Litter Chat</Link>
            </div>
            {/* MOBILE MENU */}
            <div className="md:hidden">
            </div>
            {/* RIGHT LINKS */}
            <div className="hidden md:flex gap-4 items-center justify-end flex-1">
                <ModeToggle/>
                {/* Update Navbar based on role*/}
                {/*!session?.user*/ false ? (
                    <Link href="/api/auth/signin?callbackUrl=%2F">Login</Link>
                ) : (<p>You are logged in {profile?.name}</p>)}
            </div>
        </div>
    );
};

export default Navbar;
