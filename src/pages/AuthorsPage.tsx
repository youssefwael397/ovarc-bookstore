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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  addAuthor,
  deleteAuthor,
  setAuthors,
  updateAuthor,
} from '@/store/authorsSlice';
import { IAuthor } from '@/types/types';
import { useFetchAuthorsQuery } from '@/store/bookstoreApi';

const openNotification = (type: 'success' | 'error', message: string) => {
  notification[type]({
    message,
    placement: 'top',
  });
};

const AuthorsPage: React.FC = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state: RootState) => state.authorsData.authors);
  const { data: initialAuthors } = useFetchAuthorsQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  useEffect(() => {
    if (!authors.length && initialAuthors) {
      dispatch(setAuthors(initialAuthors));
    }
  }, [dispatch, authors, initialAuthors]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    nationality: Yup.string().required('Nationality is required'),
  });

  const handleAddAuthor = async (values: Omit<IAuthor, 'id'>) => {
    const newAuthor: IAuthor = {
      id: authors[authors.length - 1]?.id + 1 || 1,
      ...values,
    };
    dispatch(addAuthor(newAuthor));
    openNotification('success', 'Author added successfully');
    setIsModalVisible(false);
  };

  const handleDeleteAuthor = async (id: number) => {
    dispatch(deleteAuthor(id));
    openNotification('success', 'Author deleted successfully');
  };

  const handleSaveInlineEdit = async (id: number) => {
    try {
      const updatedValues = await form.validateFields();
      dispatch(updateAuthor({ id, ...updatedValues }));
      setEditingId(null);
      openNotification('success', 'Author updated successfully');
    } catch (error) {
      openNotification('error', 'Failed to update author');
    }
  };

  const filteredAuthors = authors.filter((author) => {
    return (
      author.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const columns = [
    {
      title: 'Author ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: IAuthor, b: IAuthor) => a.id - b.id,
      render: (_: any, record: IAuthor) => <b>#{record.id}</b>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_: any, record: IAuthor) =>
        editingId === record.id ? (
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.first_name
        ),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (_: any, record: IAuthor) =>
        editingId === record.id ? (
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.last_name
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, record: IAuthor) =>
        editingId === record.id ? (
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.email
        ),
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
      render: (_: any, record: IAuthor) =>
        editingId === record.id ? (
          <Form.Item
            name="nationality"
            rules={[{ required: true, message: 'Nationality is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.nationality
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IAuthor) =>
        editingId === record.id ? (
          <div className="flex gap-2">
            <Button
              style={{ backgroundColor: '#28a745', color: '#fff' }}
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
              }}
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
              }}
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteAuthor(record.id)}
            />
          </div>
        ),
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row gap-3">
          <h2 className="text-[24px] leading-[36px] font-medium no-break">
            Authors List
          </h2>
          <Input
            placeholder="Search authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-[#BF5523] text-white rounded-[4px] px-4 py-2"
            onClick={() => setIsModalVisible(true)}
          >
            Add New Author
          </Button>
        </div>
      </div>

      <Form form={form} component={false}>
        <Table dataSource={filteredAuthors} columns={columns} rowKey="id" />
      </Form>

      <AddAuthorModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAddAuthor={handleAddAuthor}
        validationSchema={validationSchema}
      />
    </div>
  );
};

interface AddAuthorModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddAuthor: (values: Omit<IAuthor, 'id'>) => void;
  validationSchema: Yup.ObjectSchema<any>;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({
  visible,
  onCancel,
  onAddAuthor,
  validationSchema,
}) => {
  return (
    <Modal
      title="Add New Author"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          nationality: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onAddAuthor}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="first_name"
              placeholder="First Name"
              value={values.first_name}
              onChange={handleChange}
            />
            {touched.first_name && errors.first_name && (
              <div className="text-red-500 text-xs">{errors.first_name}</div>
            )}
            <Input
              name="last_name"
              placeholder="Last Name"
              value={values.last_name}
              onChange={handleChange}
            />
            {touched.last_name && errors.last_name && (
              <div className="text-red-500 text-xs">{errors.last_name}</div>
            )}
            <Input
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
            <Input
              name="nationality"
              placeholder="Nationality"
              value={values.nationality}
              onChange={handleChange}
            />
            {touched.nationality && errors.nationality && (
              <div className="text-red-500 text-xs">{errors.nationality}</div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={onCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: '#28a745', color: '#fff' }}
              >
                Add Author
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AuthorsPage;
