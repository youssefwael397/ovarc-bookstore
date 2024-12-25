import { PageSubTitleProps } from '@/types/types';
import React from 'react';

const PageSubTitle: React.FC<PageSubTitleProps> = ({ title }) => {
  return (
    <h2 className="text-black text-[24px] leading-[36px] font-poppins font-medium">
      {title}
    </h2>
  );
};

export default PageSubTitle;
