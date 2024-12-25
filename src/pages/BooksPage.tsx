import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  notification,
  Form,
  Select,
  Tabs,
} from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addBook, deleteBook, setBooks, updateBook } from '@/store/bookSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFetchBooksQuery } from '@/store/bookstoreApi';
import { SearchOutlined } from '@ant-design/icons';
import { IAuthor } from '@/types/types';

const { TabPane } = Tabs;

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.bookData.books);
  const authors = useSelector((state: RootState) => state.authorsData.authors);
  const { data: initalBooks } = useFetchBooksQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('books'); // Tracks which tab is active

  const openNotification = (type: 'success' | 'error', message: string) => {
    notification[type]({
      message,
      placement: 'top',
    });
  };

  useEffect(() => {
    if (!books.length && initalBooks) {
      dispatch(setBooks(initalBooks));
    }
  }, [dispatch, books, initalBooks]);

  const handleAddBook = async (values: any) => {
    const newBook = { id: books.length + 1, ...values };
    dispatch(addBook(newBook));
    openNotification('success', 'Book added successfully');
    setIsModalVisible(false);
  };

  const handleDeleteBook = async (id: string) => {
    dispatch(deleteBook(id));
    openNotification('success', 'Book deleted successfully');
  };

  const handleSaveInlineEdit = async (id: string) => {
    try {
      const updatedValues = await form.validateFields();
      dispatch(updateBook({ id, ...updatedValues }));
      setEditingId(null);
      openNotification('success', 'Book updated successfully');
    } catch (error) {
      openNotification('error', 'Failed to update book');
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Book name is required'),
    page_count: Yup.number()
      .positive('Page count must be a positive number')
      .required('Page count is required'),
    author_id: Yup.number().required('Author ID required'),
    isbn: Yup.string().required('ISBN is required'),
    language: Yup.string().required('Language is required'),
    format: Yup.string().required('Format is required'),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (_: any, record: any) => <b>{record.id}</b>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) =>
        editingId === record.id ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Book name is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.name
        ),
    },
    {
      title: 'Pages',
      dataIndex: 'page_count',
      key: 'page_count',
      render: (_: any, record: any) =>
        editingId === record.id ? (
          <Form.Item
            name="page_count"
            rules={[{ required: true, message: 'Page count is required' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.page_count
        ),
    },
    {
      title: 'Author Name',
      render: (_: any, record: any) => {
        return editingId === record.id ? (
          <Form.Item
            name="author_id"
            rules={[{ required: true, message: 'Author is required' }]}
          >
            <Select placeholder="Select Author" value={record.author_id}>
              {authors.map((author) => (
                <Select.Option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          authors.find((author: IAuthor) => author.id === record.author_id)
            ?.first_name +
            ' ' +
            authors.find((author: IAuthor) => author.id === record.author_id)
              ?.last_name
        );
      },
      key: 'author_name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) =>
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
              onClick={() => handleDeleteBook(record.id)}
            />
          </div>
        ),
    },
  ];

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTabContent = () => {
    if (activeTab === 'books') {
      return (
        <div>
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row gap-3">
              <h2 className=" text-[24px] leading-[36px] font-medium no-break">
                Books List
              </h2>
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="bg-[#BF5523] text-white rounded-[4px] px-4 py-2"
                onClick={() => setIsModalVisible(true)}
              >
                Add New Book
              </Button>
            </div>
          </div>

          <Form form={form} component={false}>
            <Table dataSource={filteredBooks} columns={columns} rowKey="id" />
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row gap-3">
              <h2 className=" text-[24px] leading-[36px] font-medium no-break">
                Authors List
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="bg-[#BF5523] text-white rounded-[4px] px-4 py-2"
                onClick={() => setIsModalVisible(true)}
              >
                Add New Book
              </Button>
            </div>
          </div>

          {/* Render authors and their books */}
          {authors.map((author) => (
            <div key={author.id} className="mb-4">
              <h3 className="bg-[#FFEBE1] text-black text-[25px] leading-[38px] font-medium py-1 px-2">
                {author.first_name} {author.last_name}
              </h3>
              <Table
                dataSource={books.filter(
                  (book) => book.author_id === author.id
                )}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="books-tabs mx-auto flex flex-row justify-center border-b-[1px] border-[#B0B0B0] mb-5">
        <Tabs
          defaultActiveKey="books"
          onChange={(key) => setActiveTab(key)}
          style={{ textAlign: 'center' }}
        >
          <TabPane tab="Books" key="books" />
          <TabPane tab="Authors" key="authors" />
        </Tabs>
      </div>

      {renderTabContent()}

      <Modal
        title="Add New Book"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{
            name: '',
            page_count: 0,
            author_id: authors[0].id,
            isbn: '',
            language: '',
            format: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddBook}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="Book Name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <div className="text-red-500">{errors.name}</div>
              )}
              <Input
                name="page_count"
                placeholder="Page Count"
                value={values.page_count}
                onChange={handleChange}
              />
              {touched.page_count && errors.page_count && (
                <div className="text-red-500">{errors.page_count}</div>
              )}

              <Select
                placeholder="Select Author"
                value={values.author_id}
                onChange={(value: number) =>
                  handleChange({ target: { name: 'author_id', value } })
                }
              >
                {authors.map((author) => (
                  <Select.Option key={author.id} value={author.id}>
                    {author.first_name} {author.last_name}
                  </Select.Option>
                ))}
              </Select>

              <Input
                name="isbn"
                placeholder="ISBN"
                value={values.isbn}
                onChange={handleChange}
              />
              <Input
                name="language"
                placeholder="Language"
                value={values.language}
                onChange={handleChange}
              />
              <Input
                name="format"
                placeholder="Format"
                value={values.format}
                onChange={handleChange}
              />

              <Button type="primary" htmlType="submit">
                Add Book
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default BooksPage;
