import { useFetchBooksQuery } from '@/store/bookstoreApi';
import { IAuthor, IBook } from '@/types/types';
import React from 'react';

interface AuthorCardProps {
  author: IAuthor;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const {
    data: books,
  } = useFetchBooksQuery();

  if (!books) {
    return <>unexpected error</>;
  }

  const publishedBoks: IAuthor[] = books.filter(
    (book: IBook) => author.id == book.author_id
  );

  return (
    <div className="w-full h-[214px] px-[22px] py-[25px] bg-white rounded-[8px] flex flex-row gap-4">
      {/* Author image */}
      <div className="h-[164px] w-[200px] flex justify-center items-center rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[3px] rounded-br-[3px] shadow-inner overflow-hidden mx-auto">
        <img
          src="/assets/profile-2.png"
          className="h-full w-full object-cover text-center"
        />
      </div>

      {/* Author details */}
      <div className="relative w-full h-full flex flex-col">
        <p className="font-medium text-[16px] leading-[24px] text-black">
          {author.first_name} {author.last_name}
        </p>
        <p className="font-normal text-[14px] leading-[21px] text-[#BF5523]">
          Published books: {publishedBoks.length}
        </p>

        {/* Button positioned at the bottom-right */}
        <button className="absolute bottom-0 right-0 bg-[#BF5523] text-white rounded-[4px] px-4 py-2">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default AuthorCard;
