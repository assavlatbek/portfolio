import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
  BankOutlined,
} from "@ant-design/icons";

import "./style.css";

import { Layout, Menu, Button } from "antd";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const styles = {
    background: "red",
    color: "#fff",
    position: "absolute",
    bottom: "12px",
  };
  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">
          <h1 className={collapsed ? "logo-style" : null}>A.S.R</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/skills",
              icon: <VideoCameraOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/portfolios",
              icon: <UploadOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/experiences",
              icon: <AuditOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/education",
              icon: <BankOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/users",
              icon: <UsergroupAddOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/logout",
              style: styles,
              icon: <LogoutOutlined />,
              label: <Link to="/logout">Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="admin-layout-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
