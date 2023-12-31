import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  AuditOutlined,
  SettingOutlined,
  BankOutlined,
} from "@ant-design/icons";

import "./style.css";

import { Layout, Menu, Button } from "antd";

const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <Layout className="user-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="user-logo">
          <h1 className={collapsed ? "logo-style" : null}>A.S.R</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "/skills",
              icon: <VideoCameraOutlined />,
              label: <Link to="/as-skills">Skills</Link>,
            },

            {
              key: "/education",
              icon: <BankOutlined />,
              label: <Link to="/as-education">Education</Link>,
            },
            {
              key: "/experience",
              icon: <AuditOutlined />,
              label: <Link to="/as-experience">Experience</Link>,
            },
            {
              key: "/portfolio",
              icon: <UploadOutlined />,
              label: <Link to="/as-portfolio">Portfolio</Link>,
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
        <Header className="user-layout-header">
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
          <Link
            className="settings-icon"
            onClick={() => {
              window.location.href = "/as-settings";
            }}
          >
            <SettingOutlined />
          </Link>
          <Link
            onClick={() => {
              window.location.href = "/profile";
            }}
            className="user-avatar"
          >
            <img
              width={"50px"}
              height={"50px"}
              src={"/me.jpg"}
              alt="Savlatbek"
            />
          </Link>
        </Header>
        <Content className="user-content-main">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
