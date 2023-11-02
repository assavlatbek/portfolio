import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";

import Cookies from "js-cookie";
import {
  useAddUserSkillMutation,
  useDeleteUserSkillMutation,
  useGetUserSkillMutation,
  useGetUserSkillsQuery,
  useUpdateUserSkillMutation,
} from "../../redux/services/userSkillService";

const Skills = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const params = {
    id: Cookies.get("user_id"),
    page,
    search,
  };
  const { data, isFetching, refetch } = useGetUserSkillsQuery(params);

  const [getSkill] = useGetUserSkillMutation();
  const [addSkill] = useAddUserSkillMutation();
  const [updateSkill] = useUpdateUserSkillMutation();
  const [deleteSkill] = useDeleteUserSkillMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editSkill(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deleteSkill(row._id);
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

    form.resetFields();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await addSkill(values);
      } else {
        await updateSkill({ id: selected, body: values });
      }
      closeModal();
      refetch();
      form.resetFields();
      setSelected(null);
    } catch (err) {
      console.log(err);
    }
  };

  async function editSkill(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getSkill(id);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Fragment>
      <Table
        loading={isFetching}
        title={() => (
          <div className="table-header">
            <h1 style={{ margin: "0" }}>
              Skills <b>({data?.pagination.total})</b>
            </h1>
            <Input
              onChange={handleSearch}
              value={search}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="primary" onClick={openModal}>
              Add Skill
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
        title={selected ? "Save old Skill" : "Add new Skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save Skill" : "Add Skill"}
      >
        <Form
          form={form}
          name="skill"
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
            label="Skill name"
            name="name"
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
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
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

export default Skills;
