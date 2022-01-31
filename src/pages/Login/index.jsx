import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Card, Form, Input, Button, Checkbox } from "antd";
import "./index.scss";
import logo from "assets/logo.png";
import { login } from "api/user";
export default class Login extends Component {
  state = {
    isLogin: false,
  };
  render() {
    const { onFinish } = this;
    const { isLogin } = this.state;
    return (
      <div className="login">
        {isLogin ? <Navigate to="/home"></Navigate> : ""}
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* 表单 */}
          <Form size="large" onFinish={onFinish}>
            <Form.Item
              name={"mobile"}
              rules={[
                { required: true, message: "手机号不能为空" },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机号格式错误",
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name={"code"}
              rules={[
                { required: true, message: "验证码不能为空" },
                {
                  pattern: /^\d{6}$/,
                  message: "验证码格式错误",
                },
              ]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name={"agree"}
              rules={[
                {
                  validator(rule, value) {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("请阅读并同意用户协议"));
                    }
                  },
                },
              ]}
            >
              <Checkbox>
                我已阅读并同意{" "}
                <a
                  href="https://ylawen.github.io/#/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  隐私条款
                </a>{" "}
                和{" "}
                <a
                  href="https://ylawen.github.io/#/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  用户协议
                </a>{" "}
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
  onFinish = async ({ mobile, code }) => {
    try {
      const res = await login(mobile, code);
      // console.log(res);
      // 登陆成功
      // 1.保存token
      localStorage.setItem("token", res.data.token);
      // 2.跳转到首页
      this.setState({
        isLogin: true,
      });
      // 3.提示消息
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
