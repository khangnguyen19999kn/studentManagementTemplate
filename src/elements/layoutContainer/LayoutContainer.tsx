import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import styleLayout from "./LayoutContainerStyle.module.scss";

const { Header, Content, Footer, Sider } = Layout;

type TMenuItem = {
  key: string;
  icon: ReactNode;
  label: string;
  disabled?: boolean;
  url: string;
};

const items: TMenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Students List",
    url: "/admin",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Student",
    url: "/student",
  },
  {
    key: "3",
    icon: <FileOutlined />,
    label: "File",
    disabled: true,
    url: "/file",
  },
  {
    key: "4",
    icon: <TeamOutlined />,
    label: "Team",
    disabled: true,
    url: "/team",
  },
  {
    key: "5",
    icon: <UserOutlined />,
    label: "User",
    disabled: true,
    url: "/user",
  },
];
export default function LayoutContainer({ children }: { children: ReactNode }) {
  const [isCollapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={isCollapsed} onCollapse={value => setCollapsed(value)}>
        {!isCollapsed ? <h1 className={styleLayout.titleNav}>Student Management</h1> : ""}
        <div className={styleLayout.groupItemNavbar}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {items.map(menuItem =>
              menuItem.disabled ? (
                <Menu.Item key={menuItem.key} disabled={true}>
                  {menuItem.label}
                </Menu.Item>
              ) : (
                <Menu.Item key={menuItem.key}>
                  <Link to={menuItem.url}>{menuItem.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Students List</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Student Management ©2023 Created by Khang Nguyễn
        </Footer>
      </Layout>
    </Layout>
  );
}
