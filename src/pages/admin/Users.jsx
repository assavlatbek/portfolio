import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/services/userService";

const Users = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isFetching, refetch } = useGetUsersQuery(page);

  const [getUser] = useGetUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editUser(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deleteUser(row._id);
                refetch();
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addUser(values);
      } else {
        await updateUser({ id: selected, body: values });
      }
      closeModal();
      refetch();
      form.resetFields();
      setSelected(null);
    } catch (err) {
      console.log(err);
    }
  };

  async function editUser(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getUser(id);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Table
        bordered
        loading={isFetching}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Users ({data?.pagination.total})</h1>
            <Button type="primary" onClick={openModal}>
              Add user
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 800 }}
        pagination={false}
      />
      <br />
      <center>
        <Pagination
          total={data?.pagination.total}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </center>
      <br />
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save user" : "Add user"}
      >
        <Form
          form={form}
          name="users"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Users;