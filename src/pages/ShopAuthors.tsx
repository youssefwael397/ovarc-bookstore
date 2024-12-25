import React, { useEffect } from 'react';
import { useFetchAuthorsQuery } from '@/store/bookstoreApi';
import PageSubTitle from '@/components/PageSubTitle';
import { IAuthor } from '@/types/types';
import AuthorCard from '@/components/AuthorCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAuthors } from '@/store/authorsSlice';

const ShopAuthors: React.FC = () => {
  const authors = useSelector((state: RootState) => state.authorsData.authors);
  const dispatch = useDispatch();

  const {
    data: initialAuthors,
    isLoading: AuthorsLoading,
    isError: AuthorsError,
  } = useFetchAuthorsQuery();

  useEffect(() => {
    if (!authors.length && initialAuthors) {
      dispatch(setAuthors(initialAuthors));
    }
  }, [dispatch, authors, initialAuthors]);

  if (AuthorsLoading) return <div>Loading...</div>;
  if (AuthorsError) return <div>Error fetching books.</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse by Authors" />
        <button className="rounded-[4px] p-2 bg-[#D86128] text-white">
          View All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {authors.map((author: IAuthor) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
};

export default ShopAuthors;
