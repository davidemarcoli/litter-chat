import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className="rounded-full overflow-hidden h-14 w-14">
      <img className="object-cover h-full w-full" src={src} alt={alt} />
    </div>
  );
};

export default Avatar;