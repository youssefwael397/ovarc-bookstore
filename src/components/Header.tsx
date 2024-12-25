import { HeaderProps } from '@/types/types';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ pathTitle, pathDescription }) => {
  return (
    <div className="w-full flex flex-row justify-between border-b-[1px] border-[#B0B0B0] pb-8">
      <div className="flex flex-col justify-start">
        <p className="text-[#3E435D] text-[24px] leading-[36px] font-medium">
          {pathTitle}
        </p>
        <p className="text-[#3E435D] text-[16px] leading-[24px] font-light flex flex-row">
          {pathDescription.map((line, index) => (
            <span key={index}>
              {line}
              {index < pathDescription.length - 1 && (
                <img
                  src="/assets/icons/right-arrow.svg"
                  alt="Right Arrow"
                  className="inline w-3 h-3 mx-2"
                />
              )}
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center ml-auto">
        <img
          src="/assets/profile.png"
          width={52}
          className="rounded-[10px]"
          alt="profile"
        />
        <p className="font-normal text-[#3E435D] text-[24px] leading-[36px]">
          Jacob Jones
        </p>
      </div>
    </div>
  );
};

export default Header;
