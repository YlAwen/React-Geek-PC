import React, { Component } from "react";
import styles from "./index.module.scss";
import { Layout, Menu, Popconfirm, message } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  LoginOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import AricleList from "pages/AricleList";
import AriclePublish from "pages/AriclePublish";
import Home from "pages/Home";
import { removeToken } from "utils/storage";
import { getUserProfile } from "api/user";

export default class LayoutComponent extends Component {
  state = {
    goLogin: false,
    userProfile: {},
  };
  render() {
    const { Header, Content, Sider } = Layout;
    const { confirm } = this;
    const { goLogin, userProfile } = this.state;
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{userProfile.name}</span>
              <span>
                {goLogin ? <Navigate to="/login"></Navigate> : ""}
                <Popconfirm
                  title="确定退出吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={confirm}
                >
                  <LoginOutlined /> 退出
                </Popconfirm>
                ,
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <NavLink to={"/home"}>数据概览</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<DiffOutlined />}>
                  <NavLink to={"/home/list"}>内容管理</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<EditOutlined />}>
                  <NavLink to={"/home/publish"}>发布文章</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content className="site-layout-background">
                <Routes>
                  {/* <Route
                    path="/"
                    element={
                      hasToken() ? <Home /> : <Navigate to="/login"></Navigate>
                    }
                  ></Route> */}
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/list" element={<AricleList />}></Route>
                  <Route path="/publish" element={<AriclePublish />}></Route>
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
  // 退出
  confirm = () => {
    removeToken();
    this.setState({
      goLogin: true,
    });
    message.success("退出成功！");
  };

  async componentDidMount() {
    const res = await getUserProfile();
    console.log(res);
    this.setState({
      userProfile: res.data,
    });
  }
}
