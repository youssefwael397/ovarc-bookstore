import { IStore } from '@/types/types';
import React from 'react';

interface StoreCardProps {
  store: IStore;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="w-full h-[214px] px-[22px] py-[25px] bg-white rounded-[8px] flex flex-row gap-4">
      {/* Store image */}
      <div
        className="h-[164px] w-[200px] flex justify-center items-center rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[3px] rounded-br-[3px] shadow-inner overflow-hidden mx-auto"
        style={{
          background: `linear-gradient(0deg, #FFEBE1, #FFEBE1),
                 linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 8%),
                 linear-gradient(90deg, rgba(255, 205, 180, 0.2) 11.6%, rgba(221, 216, 214, 0) 26.8%),
                 linear-gradient(270deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 1.2%)`,
        }}
      >
        <img
          src="/assets/icons/store-bg.svg"
          className="object-cover text-center"
        />
      </div>

      {/* Store details */}
      <div className="relative w-full h-full flex flex-col gap-2">
        <p className="font-medium text-[16px] leading-[24px] text-black">
          {store.name}
        </p>

        <p className="font-normal text-[16px] leading-[24px] text-[#8F8F8F]">
          location: {store.address_1}, {store.address_2}
        </p>

        <p className="font-normal text-[16px] leading-[24px] text-[#8F8F8F]">
          {store.city}, {store.state} - {store.zip}
        </p>
      </div>
    </div>
  );
};

export default StoreCard;
