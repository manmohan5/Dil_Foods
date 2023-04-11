import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./App.css";
import { Layout, Menu, theme } from "antd";
import routes from "./routes";
import "antd/dist/reset.css";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const { Header, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate  = useNavigate()
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

  return (
    <Layout style={style}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(obj) => { if(obj.key === '1') {
            navigate('/products')
          } else if (obj.key === '2') {
            navigate('/')
          }  } }
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Products",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
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
          <div style={{marginLeft: 16}}>
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
};
export default App;
