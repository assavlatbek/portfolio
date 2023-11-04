import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../redux/services/userPortfolioService";
import Cookies from "js-cookie";

const Portfolio = () => {
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
  const { data, isFetching, refetch } = useGetPortfoliosQuery(params);

  const [getPortfolio] = useGetPortfolioMutation();
  const [addPortfolio] = useAddPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a rel="noreferrer" target="_blank" href={url}>
          {url}
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editPortfolio(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deletePortfolio(row._id);
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
        await addPortfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      closeModal();
      refetch();
      form.resetFields();
      setSelected(null);
    } catch (err) {
      console.log(err);
    }
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getPortfolio(id);
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
              Portfolios <b>({data?.pagination.total})</b>
            </h1>
            <Input
              onChange={handleSearch}
              value={search}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="primary" onClick={openModal}>
              Add portfolio
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
        title={selected ? "Save old portfolio" : "Add new portfolio"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save portfolio" : "Add portfolio"}
      >
        <Form
          form={form}
          name="portfolio"
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
            label="Portfolio name"
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
            label="Portfolio url"
            name="url"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Portfolio;
