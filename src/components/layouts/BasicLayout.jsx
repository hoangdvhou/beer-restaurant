import { Outlet } from "react-router";
import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import LogoImage from "@/assets/logo.png";
const { Header, Content, Footer } = Layout;
import { Link } from "react-router-dom";

const BasicLayout = () => (
  <Layout>
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "#e3211c",
        height: "64px",
        paddingInline: "16px",
        color: "rgba(0, 0, 0, 0.88)",
        lineHeight: "64px",
      }}
      className="max-[450px]:py-2"
    >
      <div className="logo h-full flex items-center justify-between">
        <div className="my-auto">
          <img src={LogoImage} alt="logo" width={80} height={80} />
        </div>
        <div>
          <p className="text-white text-lg">Sức Bật Việt Nam</p>
        </div>
      </div>
    </div>

    <Content className="site-layout">
      <div className="site-layout-background">
        <Outlet />
      </div>
    </Content>
  </Layout>
);
export default BasicLayout;
