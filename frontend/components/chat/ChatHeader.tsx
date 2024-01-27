import {Avatar} from '@nextui-org/react';
import React from 'react';
import {HeaderProps} from "@/components/types/types";
import {getSubscriptionsOfUser} from "@/app/(actions)/stripe";
import {useAuth} from "@/app/(contexts)/AuthenticationContext";

const ChatHeader = ({name, avatarImg, isOnline}: HeaderProps) => {

    return (
        <div className="flex flex-row items-center bg-PURPLE p-3">

            {/* wouldn't know how to implement this honestly... */}
            <div className="flex-none">
                <Avatar
                    className="w-20 h-20 ml-2"
                    radius="full"
                    size="lg"
                    src={avatarImg}
                />
            </div>

            {/* wouldn't know how to implement this honestly... */}
            <div className="flex-col px-6">
                <h1 className="text-white font-bold text-2xl self-center">{name}</h1>
                {/* wouldn't know how to implement this honestly... */}
                <p className={`${isOnline ? 'text-green-400' : 'text-red-400'}`}>{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>
    );
};

export default ChatHeader;