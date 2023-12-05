import React, { useState } from 'react';

interface CustomSliderProps {
  items: string[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ items }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    setScrollPosition(scrollLeft);
  };

  return (
    <div className="custom-slider-container relative overflow-x-auto border border-gray-300">
      <div className="slider-content flex p-4">
        {items.map((item, index) => (
          <div key={index} className="slider-item flex-shrink-0 p-2 mr-2 border border-gray-400 rounded bg-gray-100">
            {item}
          </div>
        ))}
      </div>
      <div className="custom-scrollbar absolute top-0 right-0 h-full bg-gray-200 w-4" style={{ transform: `translateY(${scrollPosition}px)` }}></div>
    </div>
  );
};

export default CustomSlider;