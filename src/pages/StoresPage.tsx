import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, notification } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  addStore,
  deleteStore,
  setStores,
  updateStore,
} from '@/store/storeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useFetchStoresQuery } from '@/store/bookstoreApi';
import { IStore } from '@/types/types';

const StoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.storeData.stores);
  const { data: initalStores } = useFetchStoresQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const openNotification = (type: 'success' | 'error', message: string) => {
    notification[type]({
      message,
      placement: 'top',
    });
  };

  useEffect(() => {
    if (!stores.length && initalStores) {
      dispatch(setStores(initalStores));
    }
  }, [dispatch, stores, initalStores]);

  const handleAddStore = async (values: Omit<IStore, 'id'>) => {
    const newStore = { id: stores[stores.length - 1]?.id + 1, ...values };
    dispatch(addStore(newStore));
    openNotification('success', 'Store added successfully');
    setIsModalVisible(false);
  };

  const handleDeleteStore = async (id: number) => {
    dispatch(deleteStore(id));
    openNotification('success', 'Store deleted successfully');
  };

  const handleSaveInlineEdit = async (id: number) => {
    try {
      const updatedValues = await form.validateFields();
      dispatch(updateStore({ id, ...updatedValues }));
      setEditingId(null);
      openNotification('success', 'Store updated successfully');
    } catch (error) {
      openNotification('error', 'Failed to update store');
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Store name is required'),
    address_1: Yup.string().required('Address Line 1 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('ZIP is required'),
  });

  const columns = [
    {
      title: 'Store ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (_: any, record: IStore) => <b>#{record.id}</b>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: IStore) =>
        editingId === record.id ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Store name is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.name
        ),
    },
    {
      title: 'Address',
      render: (_: any, record: IStore) =>
        editingId === record.id ? (
          <>
            <Form.Item
              name="address_1"
              rules={[
                { required: true, message: 'Address Line 1 is required' },
              ]}
            >
              <Input placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item name="address_2">
              <Input placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'City is required' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: 'State is required' }]}
            >
              <Input placeholder="State" />
            </Form.Item>
            <Form.Item
              name="zip"
              rules={[{ required: true, message: 'ZIP is required' }]}
            >
              <Input placeholder="ZIP" />
            </Form.Item>
          </>
        ) : (
          `${record.address_1}, ${record.address_2 || ''}, ${record.city}, ${
            record.state
          }, ${record.zip}`
        ),
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IStore) =>
        editingId === record.id ? (
          <div className="flex gap-2">
            <Button
              style={{ backgroundColor: '#28a745', color: '#fff' }} // Inline styling
              icon={<SaveOutlined />}
              onClick={() => handleSaveInlineEdit(record.id)}
            >
              Save
            </Button>
            <Button onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              style={{
                backgroundColor: '#BF5523',
                color: '#fff',
                border: '0px',
              }} // Inline styling for edit button
              icon={<EditOutlined />}
              onClick={() => {
                setEditingId(record.id);
                form.setFieldsValue(record); // Populate form with current values
              }}
            />
            <Button
              style={{
                backgroundColor: '#BF5523',
                color: '#fff',
                border: '0px',
              }} // Inline styling for delete button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteStore(record.id)}
            />
          </div>
        ),
    },
  ];

  // Filter stores based on search query
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row gap-3">
          <h2 className="text-[24px] leading-[36px] font-medium no-break">
            Stores List
          </h2>
          <Input
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </div>
        <Button
          className="bg-[#BF5523] text-white rounded-[4px] px-4 py-2"
          onClick={() => setIsModalVisible(true)}
        >
          Add New Store
        </Button>
      </div>

      {filteredStores && (
        <Form form={form} component={false}>
          <Table dataSource={filteredStores} columns={columns} rowKey="id" />
        </Form>
      )}

      <Modal
        title="Add New Store"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{
            name: '',
            address_1: '',
            address_2: null,
            city: '',
            state: '',
            zip: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddStore}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="Store Name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <div className="text-red-500">{errors.name}</div>
              )}
              <Input
                name="address_1"
                placeholder="Address Line 1"
                value={values.address_1}
                onChange={handleChange}
              />
              {touched.address_1 && errors.address_1 && (
                <div className="text-red-500">{errors.address_1}</div>
              )}
              <Input
                name="address_2"
                placeholder="Address Line 2"
                value={values.address_2 || ''}
                onChange={handleChange}
              />
              <Input
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
              {touched.city && errors.city && (
                <div className="text-red-500">{errors.city}</div>
              )}
              <Input
                name="state"
                placeholder="State"
                value={values.state}
                onChange={handleChange}
              />
              {touched.state && errors.state && (
                <div className="text-red-500">{errors.state}</div>
              )}
              <Input
                name="zip"
                placeholder="ZIP"
                value={values.zip}
                onChange={handleChange}
              />
              {touched.zip && errors.zip && (
                <div className="text-red-500">{errors.zip}</div>
              )}

              <Button type="primary" htmlType="submit">
                Add Store
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default StoresPage;
