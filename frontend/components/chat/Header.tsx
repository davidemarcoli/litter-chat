import { Avatar } from '@nextui-org/react';
import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-row items-center bg-PURPLE p-3">
      <div className="flex-none">
        <Avatar
          className="w-20 h-20 ml-2"
          radius="full"
          size="lg"
          src="https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"
        />
      </div>
      <div className="flex-col px-6">
        <h2 className="font-bold self-center">Francisca</h2>
      </div>
    </div>
  );
};

export default Header;