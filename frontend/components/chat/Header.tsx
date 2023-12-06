import { Avatar } from '@nextui-org/react';
import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-row items-center bg-PURPLE p-3">
      
      {/* wouldn't know how to implement this honestly... */}
      <div className="flex-none">
        <Avatar
          className="w-20 h-20 ml-2"
          radius="full"
          size="lg"
          src="https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"
        />
      </div>

      {/* wouldn't know how to implement this honestly... */}
      <div className="flex-col px-6">
        <h1 className="text-white font-bold text-2xl self-center">Francisca Marionette</h1>
        {/* wouldn't know how to implement this honestly... */}
        <p className="text-green-400">Online</p>
      </div>
    </div>
  );
};

export default Header;