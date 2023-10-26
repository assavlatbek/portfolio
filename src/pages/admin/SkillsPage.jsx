import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  addSkill,
  deleteSkill,
  getSkill,
  getSkills,
  skillName,
  updateSkill,
} from "../../redux/slices/skillSlice";
import { LIMIT } from "../../constant";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const { skills, loading, total, isModalLoading } = useSelector(
    (state) => state[skillName]
  );
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    dispatch(getSkills({ search, page }));
  }, [dispatch, search, page, callback]);

  const refetch = () => {
    setCallback(!callback);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const closeModal = () => {
    setIsModalOpen(false);

    form.resetFields();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (selected === null) {
      await dispatch(addSkill(values));
    } else {
      await dispatch(updateSkill({ id: selected, values }));
    }
    refetch();
    setIsModalOpen(false);
    form.resetFields();
    setSelected(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteSkill(id));
    refetch();
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { payload } = await dispatch(getSkill(id));
    form.setFieldsValue(payload);
  };

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
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        bordered
        title={() => (
          <div className="table-header">
            <h1 style={{ margin: "0" }}>
              Skills <b>({total})</b>
            </h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={showModal} type="primary">
              Add skill
            </Button>
          </div>
        )}
        pagination={false}
        loading={loading}
        dataSource={skills}
        columns={columns}
      />
      <br />
      <center>
        {total > LIMIT ? (
          <Pagination
            total={total}
            pageSize={LIMIT}
            current={page}
            onChange={(page) => setPage(page)}
          />
        ) : null}
      </center>
      <br />
      <Modal
        title={selected ? "Save old Skill" : "Add new Skill"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
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

export default SkillsPage;
