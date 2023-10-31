import React, { useEffect, useState } from "react";
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
import CountUp from "react-countup";
import request from "../../server";
import { toast } from "react-toastify";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [limit] = useState(1000000);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  async function getAllUsers() {
    const res = await request.get(`users?role=user&limit=${limit}`);
    setUsers(res.data.data);
    setTotal(res.data.pagination.total);
  }

  async function setAsClient(id) {
    await request.put(`users/${id}`, { role: "client", client: true });
    const res = await request.get("users/" + id);
    toast.success(`${res.data.firstName} is client right now!`);
    getAllUsers();
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        e.target.closest(".hidden-content") === null &&
        e.target.closest(".notif_container") === null
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
            className="header-hide-button"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {location.pathname === "/users" ? (
            <div onClick={toggleDiv} className="notif_container">
              <img
                className="notif_icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeklEQVR4nNWaS0hVQRzGf5rZi9RMepiFvaCgXRItjJ4UuOhJq4IoKqMnbVxVizAoaBkFFZGLoBApyCgKW1UUSYX2sKjoSVQWqZELLeNf343h4tVrnjn33A8GZJz5vu/MmZkz//9c8IcioBpoVakBppJmKAK+AF1xxerGkUaolvGLMm6lVnXnSCO0yrQ7+uNV9400wgeZtikW/yD2v8hjALAAeCXTtXoYK5dUZ/+bD2QSQWQBW4D33SzwROUtsFl9I4HJwAPH4EOgElgKnAE+AR+BKmAxsBe457S3vyem+iFmO9vsE6AMyEiy70KgUX2bgVmkCFM02mbkNDD0PzgGAyfFYVz2dkNf1HdloKqfC9fe4Clx3Ql7E9gm4cca1f5iEPBInOWEBBuxlxK1rTYo2JoxzudhvZUlEmzwwN0g7kWEgMMS2+OBe5+4DxECbklsngfu+eK+QQh4J7FCD9xF4n5DCPghsSB2q3gMEbdpeEWWhDo8anRIw75V3jBcIhZv+EKbNIZ51GCUROwQ6AufpVHgUYMZErGvsC80SWO6R40/x3ATuepRo04a9qX3hnKJ2InVF05JY5NHDY5JZKdHjd3SOOJR419kN8ejxlxp1PsSGA380vaY7UuEv0f678BP7ZKBY5dG6jz+cUFaO4ImHqCY3MiX4R8rnG0+0NhkgxP0hJG+GegEb+uDIrWEQItI1xAe1kqzJYikRL6zU13uQ6onCGQAV5zcl3n5L0xQss2IXvg++yRAgbS7lAOz/HGf4/JmZ8Gl8k6jSNmaWCLPvCWF1U5MYNNpJKnHSGeadchjr3ijDvsjljHPlCfz9jqZDrEpNY3oYbq8WczSK06o8VOghOigBHgmb8eT6TDCyZLHYg+7xygmfBRL+5rjp1Eek47NDzofwlh5r8DnKFABrNNVgo3WTGCSyhiJ5TicOaob47Sbqb5l4qoQd103l0Yt8mTe+ow8YCNw1omlwyyfpW0ecgn4KF+q888BrSf7IcB13VrFbnPbga9Ap2OqU3XtTibmvvrWiKtS3KXSShluyqSdXhNhldpY28iiTSZtSiZCvtpY28iiVSZ7WpC5IST5+o3bMrm8hzYr1cay+pHFdueGt7tdJk8fWmuzlQgj24lfmrToc1RWOg9Rrygw0iiM+0FAfLGHGEuaIFs3v7YObHeyYtutTScvb+I3s5wzY2t+2hoAAAAASUVORK5CYII="
                alt="icon"
              ></img>
              <span className="notif_count">
                <CountUp end={total} duration={5} separator="," />
              </span>
            </div>
          ) : null}
        </Header>
        <Content className="admin-content">
          <Outlet />
          <div
            className={`hidden-content ${
              isOpen ? "hidden-content-open" : "hidden-content-close"
            }`}
          >
            {users.map((item, index) => (
              <div className="user-content" key={index}>
                <h4>
                  {index + 1}. {item.firstName}
                </h4>
                <Button onClick={() => setAsClient(item._id)}>
                  Set as client
                </Button>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
