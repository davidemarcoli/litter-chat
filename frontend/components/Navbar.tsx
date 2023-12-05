import React from "react";
import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth/next";
import {ModeToggle} from "@/components/theme/mode-toggle";

const Navbar = async () => {

    const session = await getServerSession(options)

    return (
        <div
            className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
            {/* LEFT LINKS */}
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/">Somehting</Link>

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
                {!session?.user ? (
                    <Link href="/api/auth/signin?callbackUrl=%2F">Login</Link>
                ) : (<p>You are logged in</p>)}
            </div>
        </div>
    );
};

export default Navbar;
