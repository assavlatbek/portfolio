import { Fragment, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  useDeleteUserEducationMutation,
  useAddUserEducationMutation,
  useGetUserEducationMutation,
  useUpdateUserEducationMutation,
  useGetUserEducationsQuery,
} from "../../redux/services/userEducationService";
import Cookies from "js-cookie";

const EducationPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const params = { id: Cookies.get("user_id"), page, search };
  const { data, isFetching, refetch } = useGetUserEducationsQuery(params);

  const [getEducation] = useGetUserEducationMutation();
  const [addEducation] = useAddUserEducationMutation();
  const [updateEducation] = useUpdateUserEducationMutation();
  const [deleteEducation] = useDeleteUserEducationMutation();

  const columns = [
    {
      title: "Education Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text.length > 50 ? `${text.slice(0, 50)}...` : text),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => `${text.slice(0, 10)}`,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => `${text.slice(0, 10)}`,
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editEducation(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deleteEducation(row._id);
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
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addEducation(values);
      } else {
        await updateEducation({ id: selected, body: values });
      }
      closeModal();
      refetch();
      setSelected(null);
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  async function editEducation(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getEducation(id);
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
        bordered
        loading={isFetching}
        title={() => (
          <div className="table-header">
            <h1 style={{ margin: "0" }}>
              Educations <b>({data?.pagination.total})</b>
            </h1>
            <Input
              onChange={handleSearch}
              value={search}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="primary" onClick={openModal}>
              Add Education
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
        title={selected ? "Save old Education" : "Add new Education"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save Education" : "Add Education"}
      >
        <Form
          form={form}
          name="education"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="on"
        >
          <Form.Item
            label="Education Name"
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
            label="Level"
            name="level"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                style={{ marginRight: "10px" }}
                rules={[
                  {
                    required: true,
                    message: "Please fill !",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Please fill !",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
