import React from 'react';
import { useFetchBooksQuery } from '@/store/bookstoreApi';

const StoreInventoryPage: React.FC = () => {
  const { data: books, isLoading, isError } = useFetchBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books.</div>;

  return (
    <div>
      <h2>Store Inventory</h2>
      <div>
        {/* Add Tab functionality here for list and grouped by author */}
        <button>Add to Inventory</button>
      </div>
      <div>
        {/* List or grouped view */}
        {books?.map((book: any) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default StoreInventoryPage;
