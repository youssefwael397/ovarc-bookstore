import React, { useEffect } from 'react';
import PageSubTitle from '@/components/PageSubTitle';
import { IStore } from '@/types/types';
import { useFetchStoresQuery } from '@/store/bookstoreApi';
import StoreCard from '@/components/StoreCard';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setStores } from '@/store/storeSlice';

const ShopStores: React.FC = () => {
  const stores = useSelector((state: RootState) => state.storeData.stores);
  const dispatch = useDispatch();

  const {
    data: initialStores,
    isLoading: StoresLoading,
    isError: StoresError,
  } = useFetchStoresQuery();

  useEffect(() => {
    if (!stores.length && initialStores) {
      dispatch(setStores(initialStores));
    }
  }, [dispatch, stores, initialStores]);

  if (StoresLoading) return <div>Loading...</div>;
  if (StoresError) return <div>Error fetching stores.</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse All Stores" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stores.map((store: IStore) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default ShopStores;
