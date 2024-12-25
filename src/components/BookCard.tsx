import { useFetchAuthorsQuery } from '@/store/bookstoreApi';
import { IAuthor, IBook } from '@/types/types';
import React from 'react';

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { data: authors } = useFetchAuthorsQuery();

  if (!authors) {
    return <>Unexpected error</>;
  }

  const author: IAuthor = authors.find(
    (author: IAuthor) => author.id == book.author_id
  );

  return (
    <div className="w-full  px-[22px] py-[25px] bg-white rounded-[8px] flex flex-row gap-4 justify-between">
      <div
        className="h-[164px] w-[195px] flex justify-center items-center rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[3px] rounded-br-[3px] shadow-inner overflow-hidden mx-auto"
        style={{
          background: `linear-gradient(0deg, #FFEBE1, #FFEBE1),
                 linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 8%),
                 linear-gradient(90deg, rgba(255, 205, 180, 0.2) 11.6%, rgba(221, 216, 214, 0) 26.8%),
                 linear-gradient(270deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 1.2%)`,
          boxShadow:
            'inset -2px 0px 5px rgba(0, 0, 0, 0.1), inset 5px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 className="text-center font-poppins font-medium text-[14px] leading-[21px] px-3">
          {book.name}
        </h3>
      </div>

      <div className="w-full">
        {/* <p className="font-medium text-[16px] leading-[24px] text-black">
          {book.name}
        </p> */}
        <p className="font-normal text-[14px] leading-[21px] text-[#8F8F8F]">
          by {author.first_name} {author.last_name}{' '}
        </p>
        <p className="font-normal text-[14px] leading-[21px] text-[#8F8F8F]">
          pages: {book.page_count}
        </p>
        <p className="font-normal text-[14px] leading-[21px] text-[#8F8F8F] mt-2">
          Stores:
        </p>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col p-2 bg-[#FFF6F1] rounded-[8px]">
            <p className="text-[14px] leading-[21px] font-normal text-center">
              1st
            </p>
            <span className="text-center text-[#E9692C] text-[16px] leading-[24px] font-semibold">
              $4
            </span>
            <div className="mx-auto">
              <button className="bg-[#2374BF] flex px-2 items-center justify-center text-white  text-[16px] leading-[24px] font-normal gap-2 rounded-[4px]">
                Sell <img src="/assets/icons/cart.svg" />
              </button>
            </div>
          </div>
          <div className="flex flex-col p-2 bg-[#FFF6F1] rounded-[8px]">
            <p className="text-[14px] leading-[21px] font-normal text-center">
              2nd
            </p>
            <span className="text-center text-[#E9692C] text-[16px] leading-[24px] font-semibold">
              $4
            </span>
            <div className="mx-auto">
              <button className="bg-[#2374BF] flex px-2 items-center justify-center text-white  text-[16px] leading-[24px] font-normal gap-2 rounded-[4px]">
                Sell <img src="/assets/icons/cart.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
