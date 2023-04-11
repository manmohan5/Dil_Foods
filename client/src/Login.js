import React, { useState } from "react";
import "./index.css";
import { Form, Input, Button, Checkbox, Layout } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [isRegister, setIsRegister ]  = useState(false)
  const style = {
    minHeight: "100vh",
    position: "absolute",
    // left: closeSidePanel ? 0 : "17.5%",
    // width: closeSidePanel ? "100%" : "calc(100% - 17.5%)",
    left: 0,
    width: "100%",
  };

  return (
    <Layout style={style}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", placeContent: "center" }}>
          <div style={{ width: 400, marginTop: 200 }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
                    {isRegister && <>
                <Form.Item
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="name"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="phone"
                />
              </Form.Item>   
              </>}  
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>          

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  { isRegister ? "register" : "Log in"}
                </Button>
                Or <span style={{color: 'blue', cursor: 'pointer'}} onClick={() =>  setIsRegister(true)} href="">register now!</span>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NormalLoginForm;
