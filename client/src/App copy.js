import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout, Menu, theme } from "antd";
import routes from "./routes";
import "antd/dist/reset.css";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import Login from './Login'

const { Header, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const authReducer = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const style = {
    minHeight: "100vh",
    position: "absolute",
    // left: closeSidePanel ? 0 : "17.5%",
    // width: closeSidePanel ? "100%" : "calc(100% - 17.5%)",
    left: 0,
    width: "100%",
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (authReducer.loading) {
    return <div>Loading.....</div>;
  }
  if (authReducer.isLoggedIn) {
    return (
      <Layout style={style}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={(obj) => {
              if (obj.key === "1") {
                navigate("/products");
              } else if (obj.key === "2") {
                navigate("/my-orders");
              }
            }}
            items={[
              {
                key: "1",
                icon: <MenuOutlined />,
                label: "Menu",
              },
              {
                key: "2",
                icon: <ShopOutlined />,
                label: "My Orders",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div style={{ marginLeft: 16 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {routes()}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  return <Login />;
};
export default App;
